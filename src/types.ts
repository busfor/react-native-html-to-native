import type { ReactNode } from 'react'
import { StyleProp } from 'react-native'

export class Node {
  constructor(
    props: { name?: string; data?: string },
    selectors: string[],
    parent: Node | null,
    attributes: NodeAttributes
  ) {
    this.parent = parent
    this.attributes = attributes
    this.children = null
    this.siblings = null
    this.selectors = selectors
    this.name = props.name
    this.data = props.data
  }

  data?: string
  name?: string
  parent: Node | null
  children: Node[] | null
  siblings: Node[] | null
  attributes?: NodeAttributes
  selectors: string[]
}

export interface ParserOptions {
  normalizeWhitespace: boolean
  recognizeSelfClosing: boolean
  decodeEntities: boolean
}

export interface HTMLRendererProps {
  html: string
  renderers?: {
    [s: string]: ElementRenderer
  }
  styles?: { [s: string]: NodeStyle }
  passProps?: {
    [s: string]: any
  }
  parserOptions?: ParserOptions
  onError?(err: any): void
  onLinkPress?(url: string): void
}

export type ElementRenderer = (
  node: Node,
  renderChildren: (nodes: Node[]) => ReactNode,
  style: NodeStyle,
  props: ElementProps
) => ReactNode

export interface ElementProps {
  attributes?: NodeAttributes
  passProps?: {
    [s: string]: any
  }
  handleLinkPress(url: string): void
}

export interface NodeAttributes {
  [s: string]: string
}

export type NodeStyle = StyleProp<any>
