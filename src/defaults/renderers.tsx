import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { ElementRenderer, TextNodeName } from '../types'
import { getNodeName } from '../utils'

const baseTextRenderer: ElementRenderer = (renderedChildren, style, props) => (
  <Text key={props.key} style={style}>
    {renderedChildren}
  </Text>
)

const baseViewRenderer: ElementRenderer = (renderedChildren, style, props) => (
  <View key={props.key} style={style}>
    {renderedChildren}
  </View>
)

export default {
  IndicatorNode: (_, style, props) => (
    <Text key={props.key} style={style}>
      {props.data}
    </Text>
  ),
  TextNode: (_, style, props) => {
    const isParentView = props.parent && !(getNodeName(props.parent) in TextNodeName)
    const isSomeSiblingsNotText = props.siblings && props.siblings.some((sibling) => sibling.type !== 'text')
    const isListItem = props.parent && getNodeName(props.parent) === 'li'
    if ((isParentView && isSomeSiblingsNotText) || isListItem) {
      const wrapText = props.data?.split(' ') || [props.data]
      return wrapText.map((text, index) => (
        <>
          <Text key={`${props.key}-${index}`} style={style}>
            {text}
          </Text>
          <Text key={`${props.key}-space-${index}`} style={style}>
            {index !== wrapText.length - 1 && ' '}
          </Text>
        </>
      ))
    } else {
      return (
        <Text key={props.key} style={style}>
          {props.data}
        </Text>
      )
    }
  },
  // Text
  h1: baseTextRenderer,
  h2: baseTextRenderer,
  h3: baseTextRenderer,
  h4: baseTextRenderer,
  h5: baseTextRenderer,
  h6: baseTextRenderer,
  b: baseTextRenderer,
  i: baseTextRenderer,
  u: baseTextRenderer,
  code: baseTextRenderer,
  mark: baseTextRenderer,
  strong: baseTextRenderer,
  small: baseTextRenderer,
  sub: baseTextRenderer,
  abbr: baseTextRenderer,
  span: baseTextRenderer,
  // View
  div: baseViewRenderer,
  p: baseViewRenderer,
  section: baseViewRenderer,
  article: baseViewRenderer,
  header: baseViewRenderer,
  footer: baseViewRenderer,
  main: baseViewRenderer,
  thead: baseViewRenderer,
  tbody: baseViewRenderer,
  tfoot: baseViewRenderer,
  li: baseViewRenderer,
  ul: baseViewRenderer,
  ol: baseViewRenderer,
  table: baseViewRenderer,
  tr: baseViewRenderer,
  td: baseViewRenderer,
  th: baseViewRenderer,
  nav: baseViewRenderer,
  address: baseViewRenderer,
  blockquote: baseViewRenderer,
  // Dividers
  br: (_, style, __) => <Text style={style}>{'\n'}</Text>,
  hr: (_, style, __) => <View style={style} />,
  // Other
  img: (_, style, props) => <Image key={props.key} style={style} source={{ uri: props.attributes?.src }} />,
  a: (renderedChildren, style, props) => (
    <Text key={props.key} style={style} onPress={() => props.handleLinkPress(props.attributes?.href)}>
      {renderedChildren}
    </Text>
  ),
  button: (renderedChildren, style, props) => (
    <TouchableOpacity key={props.key} style={style}>
      {renderedChildren}
    </TouchableOpacity>
  ),
  head: (_, __, ___) => null,
  canvas: (_, __, ___) => null,
  caption: (_, __, ___) => null,
  iframe: (_, __, ___) => null,
  svg: (_, __, ___) => null,
  var: (_, __, ___) => null,
  video: (_, __, ___) => null,
  audio: (_, __, ___) => null,
  cite: (_, __, ___) => null,
  textarea: (_, __, ___) => null,
  input: (_, __, ___) => null,
} as { [s: string]: ElementRenderer }
