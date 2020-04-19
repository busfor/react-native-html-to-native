import type { ReactNode } from 'react'
import { StyleProp } from 'react-native'

import Node from './node'

export interface HTMLRendererProps {
  html: string
  renderers?: {
    [s: string]: ElementRenderer
  }
  styles?: { [s: string]: NodeStyle }
  passProps?: {
    [s: string]: any
  }
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
