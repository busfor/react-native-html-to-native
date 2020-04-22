import * as DomUtils from 'domutils'
import type { Node } from 'domhandler'

import { TextNodeName } from './types'

export const getNodeName = (node: Node) => {
  if (DomUtils.isTag(node)) {
    return DomUtils.getName(node)
  } else if (DomUtils.isText(node)) {
    if (node.parent && getNodeName(node.parent) === 'li' && DomUtils.getChildren(node.parent).indexOf(node) === 0) {
      return TextNodeName.IndicatorNode
    }
    return TextNodeName.TextNode
  }
}

export const getNodeData = (node: Node) => {
  if (DomUtils.isText(node)) {
    return DomUtils.getText(node).replace(/\n/g, '')
  }
}

export const getNodeAttributes = (node: Node) => {
  if (DomUtils.isTag(node)) {
    return node.attribs
  }
}

export const getAttributeValue = (node: Node, name: string) => {
  if (DomUtils.isTag(node)) {
    return DomUtils.getAttributeValue(node, name)
  }
}

export const getNodeSelectors = (node: Node, parentSelectors?: string[]) => {
  const name = getNodeName(node)

  const htmlClasses = getAttributeValue(node, 'class')?.split(' ') || []
  const htmlIds = getAttributeValue(node, 'id')?.split(' ') || []

  let selectors: string[] = [name]
  if (htmlClasses.length > 0) {
    const tempSelectors = [...selectors]
    htmlClasses.forEach((htmlClass) => {
      tempSelectors.unshift(`.${htmlClass}`)
      tempSelectors.unshift(`${name}.${htmlClass}`)
    })
    selectors = tempSelectors
  }

  if (htmlIds.length > 0) {
    const tempSelectors = [...selectors]
    htmlIds.forEach((htmlId) => {
      tempSelectors.unshift(`#${htmlId}`)
      selectors.forEach((selector) => {
        tempSelectors.unshift(`${selector}#${htmlId}`)
      })
    })
    selectors = tempSelectors
  }

  if (parentSelectors?.length > 0) {
    const tempSelectors = [...selectors]
    parentSelectors?.reverse().forEach((parentSelector) => {
      selectors.forEach((selector) => {
        tempSelectors.unshift(`${parentSelector}>${selector}`)
      })
    })
    selectors = tempSelectors
  }

  return selectors
}
