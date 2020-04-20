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

const domToNode = (dom: DomNode[] | null, parent: Node | null = null): Node[] => {
  if (!dom) return null

  return dom.map((domNode: DomNode) => {
    let nativeNode: Node
    domNode.type
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

      nativeNode = new Node('tag', { name, data }, selectors, parent, tag.attribs)

      if (DomUtils.hasChildren(tag)) {
        nativeNode.children = domToNode(DomUtils.getChildren(tag), nativeNode)
        nativeNode.children.forEach((nodeChild) => {
          nodeChild.siblings = nativeNode.children.filter((child) => child !== nodeChild)
        })
      }
    } else if (DomUtils.isText(domNode)) {
      const text = domNode as DomText
      const name = 'TextNode'
      const data = DomUtils.getText(text)

      nativeNode = new Node('text', { name, data }, [], parent, {})
    }

    return nativeNode
  })
}

htmlToElement(
  '<div><p>Paragraph</p></div><a class="link" href="Test">Link</a><img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" /><p><a>Link</a> in text</p>',
  (err, elements) => {
    console.dir(elements, { depth: null })
  }
)
