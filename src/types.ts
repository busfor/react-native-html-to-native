import type { ReactNode } from 'react'
import { StyleSheet } from 'react-native'

import Node from './node'

export interface HTMLRendererProps {
  html: string
  renderers?: {
    [s: string]: ElementRenderer
  }
  styles?: { [s: string]: NodeStyle }
  passProps: {
    [s: string]: any
  }
  onError?(err: any): void
  onLinkPress?(url: string): void
}

export type ElementRenderer = (
  node: Node,
  renderChildren: (nodes: Node[]) => ReactNode,
  style: NodeStyle,
  props: {
    [s: string]: any
  }
) => ReactNode

export interface NodeAttributes {
  [s: string]: any
}

export type NodeStyle = StyleSheet.NamedStyles<any>
