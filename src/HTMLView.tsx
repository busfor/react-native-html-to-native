import React, { Fragment, ReactType, ReactNode, memo, useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, TouchableOpacity, Linking, StyleProp, ViewStyle } from 'react-native'

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

  const renderNode = useCallback(
    (node: Node): ReactNode => {
      switch (node.type) {
        case 'text':
          return node.data
        case 'tag':
          const tag = node.tag

          const style = getStyle(node.tag.path)
          const componentProps: ComponentProps = { style }

          let props = { ...tag.attributes, data: node.data }
          if (passProps) {
            props = { ...props, ...passProps }
          }

          const renderer = getRenderer(node.tag.path)
          if (renderer) {
            return renderer(node, style, props)
          }

          let RenderComponent: ReactType
          switch (tag.type) {
            case 'text':
              RenderComponent = Text
              break
            case 'touchable':
              RenderComponent = TouchableOpacity
              componentProps.onPress = () => handleLinkPress('Test')
              break
            case 'view':
            default:
              RenderComponent = View
          }

          return (
            <RenderComponent {...componentProps}>
              {tag.children?.map((childNode) => renderNode(childNode))}
            </RenderComponent>
          )
      }
    },
    [getRenderer, getStyle, styles, passProps]
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

  const handleLinkPress = useCallback(
    async (url: string) => {
      if (onLinkPress) {
        onLinkPress(url)
      } else {
        try {
          await Linking.openURL(url)
        } catch (err) {
          onError(err)
        }
      }
    },
    [onLinkPress, onError]
  )

  const renderedHtml = useMemo(() => parsedHtml && parsedHtml.map((node) => renderNode(node)), [parsedHtml])

  useEffect(() => {
    htmlToElement(html, handleHtmlParse)
  }, [html, handleHtmlParse])

  // return <Fragment />
  return <Fragment>{renderedHtml}</Fragment>
})

export default HTMLRenderer
