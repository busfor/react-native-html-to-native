// @ts-ignore
import htmlparser from 'htmlparser2-without-node-native'

import { Node, ParseCallback, Tag } from './types'
import { TextTags, TouchableTags, ContentTags, IgnoredTags } from './constants'

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
    switch (node.type) {
      case 'text':
        return new Node('text', { data: node.data })
      case 'tag':
        if (node.name === 'br') {
          return new Node('text', { data: '\n' })
        }

        const currentPaths = [node.name]
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
        parent?.tag.path.forEach((parentPath) => {
          currentPaths.forEach((path) => {
            currentPaths.push(`${parentPath}>${path}`)
          })
        })

        const tag = new Tag(node.name, currentPaths.reverse(), parent, node.attribs)
        const nativeNode = new Node('tag', { tag })

        tag.children = domToNode(node.children, nativeNode)
        switch (node.name) {
          case TextTags:
            tag.type = 'text'
            break
          case TouchableTags:
            tag.type = 'touchable'
            break
          case ContentTags:
            tag.type = 'view'
            break
          case IgnoredTags:
            return null
          // TODO: Add lists parsing
          case 'ol':
            return null
          case 'ul':
            return null
          // TODO: Add Image parsing
          case 'img':
            return null
          // TODO: Add input fields parsing
          case 'input':
            return null
          case 'textarea':
            return null
          // TODO: Add table parsing
          case 'table':
          case 'tr':
          case 'td':
          case 'th':
            return null
          default:
            return domToNode(node.children, node)
        }

        return nativeNode
    }
  })
}
