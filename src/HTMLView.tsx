import React, { Fragment, ReactType, memo, useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { HTMLRendererProps, Node, ComponentProps } from './types'
import { htmlToElement } from './utils'

const HTMLRenderer = memo(({ html, renderers, styles, passProps, onError, onLinkPress }: HTMLRendererProps) => {
  const [parsedHtml, setParsedHtml] = useState<Node[] | null>(null)

  const renderNode = useCallback(
    (node: Node) => {
      switch (node.type) {
        case 'text':
          return node.data
        case 'tag':
          const tag = node.tag

          let style = {}
          if (styles && styles[tag.name]) {
            style = { ...style, ...styles[tag.name] }
          }

          let props = { ...tag.attributes, data: node.data }
          if (passProps) {
            props = { ...props, ...passProps }
          }

          if (renderers && renderers[tag.name]) {
            return renderers[tag.name](node, style, props)
          }

          const componentProps: ComponentProps = { style }

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
    [renderers, styles, passProps]
  )

  const handleHtmlParse = useCallback((err, parsed: Node[]) => {
    if (err && onError) {
      onError(err)
    }
    setParsedHtml(parsed)
  }, [])

  const handleLinkPress = useCallback(
    (url: string) => {
      if (onLinkPress) {
        onLinkPress(url)
      } else {
        console.log(url)
      }
    },
    [onLinkPress]
  )

  const renderedHtml = useMemo(() => parsedHtml && parsedHtml.map((node) => renderNode(node)), [parsedHtml])

  useEffect(() => {
    htmlToElement(html, handleHtmlParse)
  }, [html, handleHtmlParse])

  // return <Fragment />
  return <Fragment>{renderedHtml}</Fragment>
})

export default HTMLRenderer
