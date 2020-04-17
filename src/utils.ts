// @ts-ignore
import htmlparser from 'htmlparser2-without-node-native'

import Node from './node'

export const htmlToElement = (rawHtml: string, done: (err: any, element?: any | null) => any): void => {
  const handler = new htmlparser.DomHandler((err: any, dom: any) => {
    if (err) done(err)
    done(null, domToNode(dom))
  })
  const parser = new htmlparser.Parser(handler)
  parser.write(rawHtml)
  parser.done()
}

const domToNode = (dom: any | null, parent: Node | null = null): any => {
  if (!dom) return null
  return dom.map((node: any) => {
    const nodeName = node.name || 'TextNode'
    const htmlClasses: string[] = node.attribs?.class?.split(' ') || []
    const htmlIds: string[] = node.attribs?.id?.split(' ') || []

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
    parent?.path.forEach((parentPath) => {
      tempSelectors.forEach((path) => {
        selectors.unshift(`${parentPath}>${path}`)
      })
    })

    const nativeNode = new Node({ name: nodeName, data: node.data }, selectors, parent, node.attribs)
    nativeNode.children = domToNode(node.children, nativeNode)

    return nativeNode
  })
}
