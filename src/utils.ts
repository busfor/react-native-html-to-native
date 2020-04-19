import htmlparser from 'htmlparser2-without-node-native'
import type { DomElement } from 'htmlparser2-without-node-native'
import { AllHtmlEntities } from 'html-entities'

import Node from './node'

const entities = new AllHtmlEntities()

export const htmlToElement = (rawHtml: string, done: (err: any, element?: any | null) => any): void => {
  const handler = new htmlparser.DomHandler((err, dom) => {
    if (err) done(err)
    done(null, domToNode(dom))
  })
  const parser = new htmlparser.Parser(handler)
  parser.write(rawHtml)
  parser.done()
}

const domToNode = (dom: DomElement[] | null, parent: Node | null = null): any => {
  if (!dom) return null
  return dom.map((domElement: DomElement) => {
    const nodeName = domElement.name || 'TextNode'
    const htmlClasses: string[] = domElement.attribs?.class?.split(' ') || []
    const htmlIds: string[] = domElement.attribs?.id?.split(' ') || []

    const selectors: string[] = [nodeName]
    htmlClasses.forEach((htmlClass) => {
      selectors.unshift(`.${htmlClass}`)
      selectors.unshift(`${nodeName}.${htmlClass}`)
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

    const nativeNode = new Node(
      { name: nodeName, data: entities.decode(domElement.data) },
      selectors,
      parent,
      domElement.attribs
    )
    nativeNode.children = domToNode(domElement.children, nativeNode)
    if (nativeNode.children) {
      nativeNode.children.forEach((nodeChild) => {
        nodeChild.siblings = nativeNode.children.filter((child) => child !== nodeChild)
      })
    }

    return nativeNode
  })
}
