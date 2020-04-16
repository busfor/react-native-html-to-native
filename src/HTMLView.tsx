import React, { Fragment, ReactNode, memo, useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, TouchableOpacity, Linking, StyleProp, ViewStyle, Image } from 'react-native'

import { HTMLRendererProps, Node, ComponentProps, ElementRenderer } from './types'
import { htmlToElement } from './utils'

const HTMLRenderer = memo(({ html, renderers, styles, passProps, onError, onLinkPress }: HTMLRendererProps) => {
  const [parsedHtml, setParsedHtml] = useState<Node[] | null>(null)

  const getRenderer = useCallback(
    (path: string[]): ElementRenderer | null => {
      if (renderers) {
        for (let i = 0, p; (p = path[i]); i++) {
          if (renderers[p]) {
            return renderers[p]
          }
        }
      }
      return null
    },
    [renderers]
  )

  const getStyle = useCallback(
    (path: string[]): StyleProp<ViewStyle> => {
      if (styles) {
        for (let i = 0, p; (p = path[i]); i++) {
          if (styles[p]) {
            return styles[p]
          }
        }
      }
      return {}
    },
    [styles]
  )

  const handleLinkPress = useCallback(
    async (url?: string) => {
      if (!url) {
        return
      }
      if (onLinkPress) {
        onLinkPress(url)
      } else {
        try {
          await Linking.openURL(url)
        } catch (err) {
          if (onError) {
            onError(err)
          }
        }
      }
    },
    [onLinkPress, onError]
  )

  const renderNode = useCallback(
    (node: Node): ReactNode => {
      const renderNodes = (nodes?: Node[]) => nodes?.map((n) => <>{renderNode(n)}</>)

      const style = getStyle(node.path)
      const componentProps: ComponentProps = { style }

      let props = { ...node.attributes, data: node.data }
      if (passProps) {
        props = { ...props, ...passProps }
      }

      const renderer = getRenderer(node.path)
      if (renderer) {
        return renderer(node, renderNodes, style, props)
      }

      switch (node.type) {
        case 'text':
          return <Text {...componentProps}>{node.data}</Text>
        case 'touchable':
          componentProps.onPress = () => handleLinkPress(node.attributes?.href)
          return <TouchableOpacity {...componentProps}>{renderNodes(node.children)}</TouchableOpacity>
        case 'image':
          componentProps.source = { uri: node.attributes?.src }
          // @ts-ignore
          return <Image {...componentProps} />
        case 'container':
        default:
          return <View {...componentProps}>{renderNodes(node.children)}</View>
      }
    },
    [getRenderer, getStyle, styles, passProps, handleLinkPress]
  )

  const handleHtmlParse = useCallback(
    (err, parsed: Node[]) => {
      if (err && onError) {
        onError(err)
      }
      setParsedHtml(parsed)
    },
    [onError]
  )

  const renderedHtml = useMemo(() => parsedHtml && parsedHtml.map((node) => renderNode(node)), [parsedHtml])

  useEffect(() => {
    htmlToElement(html, handleHtmlParse)
  }, [html, handleHtmlParse])

  return <Fragment>{renderedHtml}</Fragment>
})

HTMLRenderer.displayName = 'HTMLRenderer'

export default HTMLRenderer
