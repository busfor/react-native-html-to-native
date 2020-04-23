import type { ReactNode } from 'react'
import type { StyleProp } from 'react-native'
import type { Node } from 'domhandler'

export interface ParserOptions {
  normalizeWhitespace: boolean
  recognizeSelfClosing: boolean
  decodeEntities: boolean
}

export interface HTMLViewProps {
  html: string
  renderers?: {
    [s: string]: ElementRenderer
  }
  styles?: { [s: string]: StyleProp<any> }
  passProps?: {
    [s: string]: any
  }
  parserOptions?: ParserOptions
  onError?(err: any): void
  onLinkPress?(url: string): void
  onLoading?(loadingState: boolean): void
}

export type ElementRenderer = (renderedChildren: ReactNode[], style: StyleProp<any>, props: ElementProps) => ReactNode

export interface ElementProps {
  attributes?: { [s: string]: string }
  passProps?: {
    [s: string]: any
  }
  handleLinkPress?(url: string): void
  node: Node
  children?: Node[]
  siblings?: Node[]
  parent?: Node
  data?: string
  key: string
}

export enum TextNodeName {
  IndicatorNode = 'IndicatorNode',
  TextNode = 'TextNode',
  b = 'b',
  i = 'i',
  u = 'u',
  code = 'code',
  mark = 'mark',
  strong = 'strong',
  small = 'small',
  sub = 'sub',
  abbr = 'abbr',
  span = 'span',
  a = 'a',
}
