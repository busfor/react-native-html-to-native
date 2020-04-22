import type { ReactNode } from 'react'
import type { StyleProp } from 'react-native'
import type { Node as DomNode } from 'domhandler'

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
  styles?: { [s: string]: StyleProp<any> }
  passProps?: {
    [s: string]: any
  }
  parserOptions?: ParserOptions
  onError?(err: any): void
  onLinkPress?(url: string): void
}

export type ElementRenderer = (renderedChildren: ReactNode[], style: StyleProp<any>, props: ElementProps) => ReactNode

export interface ElementProps {
  attributes?: { [s: string]: string }
  passProps?: {
    [s: string]: any
  }
  handleLinkPress?(url: string): void
  children?: DomNode[]
  siblings?: DomNode[]
  parent?: DomNode
  data?: string
  key: string
}

export interface NodeAttributes {}
