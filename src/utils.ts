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
    const currentPaths = [node.name || 'TextNode']
    const htmlClasses = node.attribs?.class?.split(' ') || []
    const htmlIds = node.attribs?.id?.split(' ') || []

    htmlClasses.forEach((htmlClass: string) => {
      currentPaths.push(`${node.name}.${htmlClass}`)
    })
    currentPaths.forEach((path) => {
      htmlIds.forEach((htmlId: string) => {
        currentPaths.push(`${path}#${htmlId}`)
      })
    })
    parent?.path.forEach((parentPath) => {
      currentPaths.forEach((path) => {
        currentPaths.push(`${parentPath}>${path}`)
      })
    })

    const nativeNode = new Node({ name: node.name, data: node.data }, currentPaths.reverse(), parent, node.attribs)
    nativeNode.children = domToNode(node.children, nativeNode)

    return nativeNode
  })
}
