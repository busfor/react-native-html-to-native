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
    let nativeNode: Node = null

    if (DomUtils.isTag(domNode)) {
      const tag = domNode as DomElement
      const name = DomUtils.getName(tag)
      const data: string = undefined
      const htmlClasses = DomUtils.getAttributeValue(tag, 'class')?.split(' ') || []
      const htmlIds = DomUtils.getAttributeValue(tag, 'id')?.split(' ') || []

      nativeNode = new Node({ name, data }, [name], parent, tag.attribs)

      if (DomUtils.hasChildren(tag)) {
        nativeNode.children = domToNode(DomUtils.getChildren(tag), nativeNode)
        nativeNode.children.forEach((nodeChild) => {
          nodeChild.siblings = nativeNode.children.filter((child) => child !== nodeChild)
        })
      }
    }

    if (DomUtils.isText(domNode)) {
      const text = domNode as DomText
      const name = 'TextNode'
      const data = DomUtils.getText(text)

      nativeNode = new Node({ name, data }, [name], parent, {})
    }

    // const selectors: string[] = [nodeName]
    // htmlClasses.forEach((htmlClass) => {
    //   selectors.unshift(`.${htmlClass}`)
    //   selectors.unshift(`${nodeName}.${htmlClass}`)
    // })

    // let tempSelectors = [...selectors]
    // htmlIds.forEach((htmlId) => {
    //   selectors.unshift(`#${htmlId}`)
    //   tempSelectors.forEach((selector) => {
    //     selectors.unshift(`${selector}#${htmlId}`)
    //   })
    // })

    // tempSelectors = [...selectors]
    // const parentSelectors = [...(parent?.selectors || [])].reverse()
    // parentSelectors.forEach((parentSelector) => {
    //   tempSelectors.forEach((selector) => {
    //     selectors.unshift(`${parentSelector}>${selector}`)
    //   })
    // })

    return nativeNode
  })
}

htmlToElement('<p>A</p><h1>a</h1>', (err, elements) => {
  console.log(elements)
})
