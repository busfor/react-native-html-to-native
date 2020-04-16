// @ts-ignore
import htmlparser from 'htmlparser2-without-node-native'

import { Node, ParseCallback, NodeType } from './types'
import { TextTags, TouchableTags, ContentTags, IgnoredTags, ImageTags } from './constants'

export const htmlToElement = (rawHtml: string, done: ParseCallback): void => {
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
    if (IgnoredTags.includes(node.name)) {
      return null
    }

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

    let data: string
    if (node.type === 'text') {
      data = node.data
    } else if (node.name === 'br') {
      data = '\n'
    } else {
      data = node.name
    }

    let nodeType: NodeType
    if (node.type === 'text' || node.name === 'br') {
      nodeType = 'text'
    } else if (TouchableTags.includes(node.name)) {
      nodeType = 'touchable'
    } else if (ContentTags.includes(node.name) || TextTags.includes(node.name)) {
      nodeType = 'container'
    } else if (ImageTags.includes(node.name)) {
      nodeType = 'image'
    } else {
      return domToNode(node.children, parent)
    }

    const nativeNode = new Node(nodeType, currentPaths.reverse(), parent, node.attribs, data)
    nativeNode.children = domToNode(node.children, nativeNode)
    return nativeNode
  })
}
