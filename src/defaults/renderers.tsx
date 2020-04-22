import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import type { ElementRenderer } from '../types'

export default {
  IndicatorNode: (_, style, props) => (
    <Text key={props.key} style={style}>
      {props.data}
    </Text>
  ),
  TextNode: (_, style, props) => {
    if (props.siblings && props.siblings.some((sibling) => sibling.type !== 'text')) {
      const wrapText = props.data?.split(' ') || [props.data]
      return wrapText.map((text, index) => (
        <Text key={`${props.key}-${index}`} style={style}>
          {text}
          {index !== wrapText.length - 1 && ' '}
        </Text>
      ))
    } else {
      return (
        <Text key={props.key} style={style}>
          {props.data}
        </Text>
      )
    }
  },
  br: (_, style, props) => <View key={props.key} style={style} />,
  p: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  h1: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  h2: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  h3: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  h4: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  h5: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  h6: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  b: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  i: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  u: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  li: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  code: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  nav: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  mark: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  strong: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  small: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  sub: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  abbr: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  address: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  blockquote: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
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
  div: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  span: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  section: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  article: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  header: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  footer: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  main: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  thead: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  tbody: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  tfoot: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  hr: (_, style, props) => <View key={props.key} style={style} />,
  ul: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  ol: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  table: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  tr: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  td: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
  ),
  th: (renderedChildren, style, props) => (
    <View key={props.key} style={style}>
      {renderedChildren}
    </View>
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
