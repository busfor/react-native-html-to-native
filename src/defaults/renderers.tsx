import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

import type { ElementRenderer } from '../types'

export default {
  p: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  h1: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  h2: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  h3: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  h4: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  h5: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  h6: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  b: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  i: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  u: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  li: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      • {renderChildren(node.children)}
    </Text>
  ),
  code: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  nav: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  mark: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  strong: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  small: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  sub: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  abbr: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  address: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  blockquote: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  img: (node, __, style, props) => (
    <Image key={node.selectors[0]} style={style} source={{ uri: props.attributes?.src }} />
  ),
  a: (node, renderChildren, style, props) => {
    if (
      (node.parent && node.parent.type === 'text') ||
      (node.siblings && node.siblings.some((sibling) => sibling.type === 'text'))
    ) {
      return (
        <Text key={node.selectors[0]} style={style} onPress={() => props.handleLinkPress(props.attributes?.href)}>
          {renderChildren(node.children)}
        </Text>
      )
    } else {
      return (
        <TouchableOpacity
          key={node.selectors[0]}
          style={style}
          onPress={() => props.handleLinkPress(props.attributes?.href)}
        >
          <Text style={style}>{renderChildren(node.children)}</Text>
        </TouchableOpacity>
      )
    }
  },
  button: (node, renderChildren, style, _) => (
    <TouchableHighlight key={node.selectors[0]} style={style}>
      <Text style={style}>{renderChildren(node.children)}</Text>
    </TouchableHighlight>
  ),
  div: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  span: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  section: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  article: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  header: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  footer: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  main: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  thead: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  tbody: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  tfoot: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  hr: (_, __, style, ___) => <View style={style} />,
  ul: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  ol: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  table: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  tr: (node, renderChildren, style, _) => (
    <View key={node.selectors[0]} style={style}>
      {node.children.map((child) => {
        if (child.type === 'text') {
          return <Text style={style}>{renderChildren([child])}</Text>
        } else {
          return renderChildren([child])
        }
      })}
    </View>
  ),
  td: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
  ),
  th: (node, renderChildren, style, _) => (
    <Text key={node.selectors[0]} style={style}>
      {renderChildren(node.children)}
    </Text>
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
