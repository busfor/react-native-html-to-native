import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

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

export interface NodeStyle {
  [s: string]: ViewStyle
}

export type ElementRenderer = (
  node: Node,
  style: NodeStyle,
  props: {
    [s: string]: any
  }
) => ReactNode

export type ComponentProps = { [s: string]: any }

export type ParseCallback = (err: any, element?: any | null) => any

export type TagType = 'text' | 'view' | 'touchable'
export type NodeType = 'tag' | 'text'

export interface TagAttributes {
  [s: string]: any
}

export class Tag {
  constructor(name: string, path: string[], parent: Node | null, attributes: TagAttributes) {
    this.name = name
    this.type = 'view'
    this.parent = parent
    this.attributes = attributes
    this.children = null
    this.siblings = null
    this.path = path
  }

  name: string
  type: TagType
  parent: Node | null
  children: Node[] | null
  siblings: Node[] | null
  attributes?: TagAttributes
  path: string[]
}

export class Node {
  constructor(type: NodeType, node: { tag?: Tag; data?: string }) {
    this.type = type
    switch (type) {
      case 'tag':
        this.tag = node.tag
        break
      case 'text':
        this.data = node.data
        this.tag = null
        break
    }
  }

  type: NodeType
  tag: Tag | null
  data?: string
}
