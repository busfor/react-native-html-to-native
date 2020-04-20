import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'

import type { ElementRenderer } from '../types'

export default {
  TextNode: (node, _, style, __) => (
    <Text key={node.selectors[0]} style={style}>
      {node.parent.name === 'li' && '•'} {node.data}
    </Text>
  ),
  p: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  h1: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  h2: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  h3: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  h4: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  h5: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  h6: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  b: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  i: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  u: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  li: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  code: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  nav: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  mark: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  strong: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  small: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  sub: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  abbr: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  address: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  blockquote: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  img: (node, __, style, props) => (
    <Image key={node.selectors[0]} style={style} source={{ uri: props.attributes?.src }} />
  ),
  a: (node, renderChildren, style, props) => (
    <Text key={node.selectors[0]} style={style} onPress={() => props.handleLinkPress(props.attributes?.href)}>
      {renderChildren(node.children)}
    </Text>
  ),
  button: (node, renderChildren, style, _) => (
    <TouchableHighlight key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </TouchableHighlight>
  ),
  div: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  span: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  section: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  article: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  header: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  footer: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  main: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  thead: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  tbody: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  tfoot: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  hr: (_, __, style, ___) => <View style={style} />,
  ul: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  ol: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  table: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  tr: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  td: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  th: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </View>
  ),
  head: (_, __, ___, ____) => null,
  canvas: (_, __, ___, ____) => null,
  caption: (_, __, ___, ____) => null,
  iframe: (_, __, ___, ____) => null,
  svg: (_, __, ___, ____) => null,
  var: (_, __, ___, ____) => null,
  video: (_, __, ___, ____) => null,
  audio: (_, __, ___, ____) => null,
  cite: (_, __, ___, ____) => null,
  textarea: (_, __, ___, ____) => null,
  input: (_, __, ___, ____) => null,
} as { [s: string]: ElementRenderer }
