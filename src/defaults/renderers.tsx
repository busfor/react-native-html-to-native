import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import type { ElementRenderer } from '../types'

export default {
  TextNode: (node, _, style, props) => (
    <Text style={style} {...props.passProps}>
      {node.data}
    </Text>
  ),
  p: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  h1: (node, renderChildren, _, __) => renderChildren(node.children),
  h2: (node, renderChildren, _, __) => renderChildren(node.children),
  h3: (node, renderChildren, _, __) => renderChildren(node.children),
  h4: (node, renderChildren, _, __) => renderChildren(node.children),
  h5: (node, renderChildren, _, __) => renderChildren(node.children),
  h6: (node, renderChildren, _, __) => renderChildren(node.children),
  b: (node, renderChildren, _, __) => renderChildren(node.children),
  i: (node, renderChildren, _, __) => renderChildren(node.children),
  u: (node, renderChildren, _, __) => renderChildren(node.children),
  li: (node, renderChildren, _, __) => renderChildren(node.children),
  code: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  nav: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  mark: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  strong: (node, renderChildren, _, __) => renderChildren(node.children),
  small: (node, renderChildren, _, __) => renderChildren(node.children),
  sub: (node, renderChildren, _, __) => renderChildren(node.children),
  abbr: (node, renderChildren, _, __) => renderChildren(node.children),
  address: (node, renderChildren, _, __) => renderChildren(node.children),
  blockquote: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  img: (_, __, style, props) => <Image style={style} source={{ uri: props.attributes?.src }} {...props.passProps} />,
  a: (node, renderChildren, style, props) => (
    <TouchableOpacity style={style} onPress={() => props.handleLinkPress(props.attributes?.href)}>
      {renderChildren(node.children)}
    </TouchableOpacity>
  ),
  button: (node, renderChildren, style, props) => (
    <TouchableHighlight style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </TouchableHighlight>
  ),
  div: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  span: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  section: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  article: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  header: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  footer: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  main: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  thead: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  tbody: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  tfoot: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  hr: (_, __, style, props) => <View style={style} {...props.passProps} />,
  ul: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  ol: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  table: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  tr: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  td: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
      {renderChildren(node.children)}
    </View>
  ),
  th: (node, renderChildren, style, props) => (
    <View style={style} {...props.passProps}>
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
