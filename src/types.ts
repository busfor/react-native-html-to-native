import { ReactNode } from 'react'
import { ViewStyle, StyleProp } from 'react-native'

export interface HTMLRendererProps {
  html: string
  renderers?: {
    [s: string]: ElementRenderer
  }
  styles?: NodeStyle
  passProps: {
    [s: string]: any
  }
  onError?(err: any): void
  onLinkPress?(url: string): void
}

export type ElementRenderer = (
  node: Node,
  renderChildren: (nodes: Node[]) => ReactNode,
  style: StyleProp<ViewStyle>,
  props: {
    [s: string]: any
  }
) => ReactNode

export type ComponentProps = { [s: string]: any }

export type ParseCallback = (err: any, element?: any | null) => any

export type NodeType = 'text' | 'container' | 'touchable' | 'image'

export interface NodeAttributes {
  [s: string]: any
}

export interface NodeStyle {
  [s: string]: StyleProp<ViewStyle>
}

export class Node {
  constructor(type: NodeType, path: string[], parent: Node | null, attributes: NodeAttributes, data: string) {
    this.type = type
    this.type = type
    this.parent = parent
    this.attributes = attributes
    this.children = null
    this.siblings = null
    this.path = path

    switch (type) {
      case 'text':
        this.data = data
        break
      case 'image':
      case 'container':
      case 'touchable':
      default:
        this.name = data
    }
  }

  type: NodeType
  data?: string
  name?: string
  parent: Node | null
  children: Node[] | null
  siblings: Node[] | null
  attributes?: NodeAttributes
  path: string[]
}
