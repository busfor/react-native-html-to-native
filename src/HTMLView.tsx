import React, { Fragment, ReactNode, memo, useState, useEffect, useCallback, useMemo } from 'react'
import { Linking } from 'react-native'

import type { HTMLRendererProps, ElementRenderer, NodeStyle, ElementProps } from './types'
import Node from './node'
import { htmlToElement } from './utils'
import Defaults from './defaults'

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
      return Defaults.renderers[path[path.length - 1]]
    },
    [renderers]
  )

  const getStyle = useCallback(
    (path: string[]): NodeStyle => {
      if (styles) {
        for (let i = 0, p; (p = path[i]); i++) {
          if (styles[p]) {
            return styles[p]
          }
        }
      }
      return Defaults.styles[path[path.length - 1]]
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
      const renderNodes = (nodes?: Node[]) => nodes?.map((n) => renderNode(n))

      const style = getStyle(node.path)
      const props: ElementProps = { attributes: node.attributes, handleLinkPress, passProps }
      const renderer = getRenderer(node.path)

      if (renderer) {
        return renderer(node, renderNodes, style, props)
      }
      return null
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
