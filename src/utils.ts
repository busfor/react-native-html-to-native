// @ts-ignore
import { Parser } from 'htmlparser2-without-node-native'
import { DomHandler } from 'domhandler'
import * as DomUtils from 'domutils'
import type { Node as DomNode, Element as DomElement, DataNode as DomText } from 'domhandler'

import { Node, ParserOptions } from './types'

export const htmlToElement = (
  rawHtml: string,
  done: (err: Error, element?: Node[] | null) => void,
  parserOptions?: ParserOptions
): void => {
  const handler = new DomHandler(
    (err, dom) => {
      if (err) done(err)
      done(null, domToNode(dom))
    },
    { normalizeWhitespace: parserOptions?.normalizeWhitespace || false }
  )

  const parser = new Parser(handler, {
    decodeEntities: parserOptions?.decodeEntities || true,
    recognizeSelfClosing: parserOptions?.recognizeSelfClosing || true,
  })
  parser.write(rawHtml)
  parser.done()
}

const domToNode = (
  dom: DomNode[] | null,
  parent: Node | null = null,
  orderedList: { ordered: boolean; indexPrefix: string } | null = null,
  unorderedList: boolean | null = null
): Node[] => {
  if (!dom) return null

  return dom.map((domNode: DomNode) => {
    let nativeNode: Node

    if (DomUtils.isTag(domNode)) {
      const tag = domNode as DomElement
      const name = DomUtils.getName(tag)
      const data: string = undefined
      const htmlClasses = DomUtils.getAttributeValue(tag, 'class')?.split(' ') || []
      const htmlIds = DomUtils.getAttributeValue(tag, 'id')?.split(' ') || []

      const selectors: string[] = [name]
      htmlClasses.forEach((htmlClass) => {
        selectors.unshift(`.${htmlClass}`)
        selectors.unshift(`${name}.${htmlClass}`)
      })

      let tempSelectors = [...selectors]
      htmlIds.forEach((htmlId) => {
        selectors.unshift(`#${htmlId}`)
        tempSelectors.forEach((selector) => {
          selectors.unshift(`${selector}#${htmlId}`)
        })
      })

      tempSelectors = [...selectors]
      const parentSelectors = [...(parent?.selectors || [])].reverse()
      parentSelectors.forEach((parentSelector) => {
        tempSelectors.forEach((selector) => {
          selectors.unshift(`${parentSelector}>${selector}`)
        })
      })

      nativeNode = new Node({ name, data }, selectors, parent, tag.attribs)
      let index = 0
      if (DomUtils.hasChildren(tag)) {
        let nextOrderedList = null
        let nextUnorderedList = null

        if (nativeNode.name === 'ul' || unorderedList) {
          nextUnorderedList = true
        } else if (nativeNode.name === 'ol') {
          const prefix = (orderedList && orderedList.indexPrefix) || ''
          nextOrderedList = { ordered: true, indexPrefix: `${prefix}`.concat(prefix !== '' ? '.' : '') }
        } else if (nativeNode.name === 'li') {
          const prefix = (orderedList && orderedList.indexPrefix) || ''
          index =
            DomUtils.getSiblings(domNode)
              .filter((sibling) => DomUtils.isTag(sibling) && DomUtils.getName(sibling as DomElement))
              .indexOf(domNode) + 1
          nextOrderedList = { ordered: true, indexPrefix: `${prefix}${index}` }
        }

        nativeNode.children = domToNode(DomUtils.getChildren(tag), nativeNode, nextOrderedList, nextUnorderedList)
        if (nativeNode.name === 'li') {
          let indicatorData = ''
          let indicatorName = ''

          if (unorderedList) {
            indicatorName = 'UnorderedIndicator'
            indicatorData = '•'
          } else if (orderedList) {
            indicatorName = 'OrderedIndicator'
            indicatorData = `${orderedList.indexPrefix}${index}`
          }

          const indicatorSelectors = [indicatorName, 'TextNode']
          parentSelectors.forEach((parentSelector) => {
            indicatorSelectors.unshift(`${parentSelector}>TextNode`)
            indicatorSelectors.unshift(`${parentSelector}>${indicatorName}`)
          })
          nativeNode.children.unshift(
            new Node({ name: indicatorName, data: indicatorData }, indicatorSelectors, nativeNode, {})
          )
        }
        nativeNode.children.forEach((nodeChild) => {
          nodeChild.siblings = nativeNode.children.filter((child) => child !== nodeChild)
        })
      }
    } else if (DomUtils.isText(domNode)) {
      const text = domNode as DomText
      const name = 'TextNode'
      const data = DomUtils.getText(text)

      const selectors: string[] = [name]
      const parentSelectors = [...(parent?.selectors || [])].reverse()
      parentSelectors.forEach((parentSelector) => {
        selectors.unshift(`${parentSelector}>${name}`)
      })
      nativeNode = new Node({ name, data }, selectors, parent, {})
    }

    return nativeNode
  })
}

htmlToElement('<ol><li>Item</li><li>Item</li><li><ol><li>Item</li><li>Item</li></ol></li></ol>', (err, elements) => {
  console.dir(elements, { depth: null })
})
