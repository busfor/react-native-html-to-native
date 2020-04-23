import React, { Fragment, ReactNode, memo, useState, useEffect, useCallback, useMemo } from 'react'
import { Linking } from 'react-native'
import type { StyleProp } from 'react-native'
import { Parser } from 'htmlparser2-without-node-native'
import { DomHandler, Node, DataNode } from 'domhandler'
import { ElementType } from 'domelementtype'
import * as DomUtils from 'domutils'

import { HTMLRendererProps, ElementRenderer, ElementProps, TextNodeName } from './types'
import Defaults from './defaults'
import { getNodeData, getNodeAttributes, getNodeSelectors, getNodeName } from './utils'

const HTMLRenderer = memo(
  ({
    html,
    renderers,
    styles,
    passProps,
    onError,
    onLinkPress,
    parserOptions,
    onLoading,
    LoaderComponent,
  }: HTMLRendererProps) => {
    const [nodes, setNodes] = useState<Node[]>(null)
    const [loading, setLoading] = useState<boolean>(false)

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

    const handleParseError = useCallback(
      (err) => {
        if (onError) {
          onError(err)
        }
      },
      [onError]
    )

    const getRenderer = useCallback(
      (selectors: string[]): ElementRenderer | null => {
        if (renderers) {
          for (let i = 0, selector; (selector = selectors[i]); i++) {
            if (renderers[selector]) {
              return renderers[selector]
            }
          }
        }
        return Defaults.renderers[selectors[selectors.length - 1]]
      },
      [renderers]
    )

    const getStyle = useCallback(
      (selectors: string[]): StyleProp<any> => {
        const reversedSelectors = [...selectors].reverse()
        let style = Defaults.styles[reversedSelectors[0]] || {}
        if (styles) {
          for (let i = 0, selector; (selector = reversedSelectors[i]); i++) {
            if (styles[selector]) {
              style = { ...style, ...styles[selector] }
            }
          }
        }
        return style
      },
      [styles]
    )

    const renderDomNode = useCallback(
      (
        node: Node,
        previousSelectors?: string[],
        orderedList?: { ordered: boolean; indexPrefix: string },
        unorderedList?: boolean
      ): ReactNode => {
        if (!node) return null

        const name = getNodeName(node)
        const data = getNodeData(node)

        if (name === TextNodeName.TextNode && data.trim().length === 0) {
          return null
        }

        const attributes = getNodeAttributes(node)
        const selectors = getNodeSelectors(node, previousSelectors)

        let children = DomUtils.getChildren(node)
        const siblings = DomUtils.getSiblings(node)
        const parent = DomUtils.getParent(node)

        const renderer = getRenderer(selectors)
        let style = getStyle(selectors)

        let renderedChildren = null
        if (DomUtils.hasChildren(node)) {
          let nextOrderedList: { ordered: boolean; indexPrefix: string } = null
          let nextUnorderedList: boolean = null

          let index = 0
          if (name === 'ul') {
            nextUnorderedList = true
          } else if (name === 'ol') {
            const prefix = (orderedList && orderedList.indexPrefix) || ''
            nextOrderedList = { ordered: true, indexPrefix: `${prefix}` }
          } else if (name === 'li') {
            const prefix = (orderedList && orderedList.indexPrefix) || ''
            index = siblings.filter((sibling) => getNodeName(sibling) === 'li').indexOf(node) + 1
            nextOrderedList = { ordered: true, indexPrefix: `${prefix}${index}`.concat('.') }

            let indicatorData = ''
            if (unorderedList) {
              indicatorData = '•'
            } else if (orderedList) {
              indicatorData = `${orderedList.indexPrefix}${index}`.concat(orderedList.indexPrefix === '' ? '.' : '')
            }

            const indicator = new DataNode(ElementType.Text, indicatorData)
            DomUtils.prepend(children[0], indicator)
          }

          if (children.some((child) => child.type !== 'text')) {
            style = { ...style, ...Defaults.styles.TextWrap }
          }

          // TextNode can only contain TextNode
          children = name in TextNodeName ? children.filter((child) => getNodeName(child) in TextNodeName) : children

          renderedChildren = children.map((child) =>
            renderDomNode(child, selectors, nextOrderedList, nextUnorderedList)
          )
        }

        const props: ElementProps = {
          node,
          attributes,
          handleLinkPress,
          passProps,
          children,
          siblings,
          parent,
          data,
          key: String(node.startIndex),
        }
        if (renderer) {
          return renderer(renderedChildren, style, props)
        } else {
          return renderedChildren
        }
      },
      [handleLinkPress]
    )

    const domHandlerCallback = useCallback(
      (err: Error, dom: Node[]) => {
        if (err) {
          handleParseError(err)
        } else {
          setNodes(dom)
        }
      },
      [handleParseError]
    )

    const domHandler = useMemo(
      () =>
        new DomHandler(domHandlerCallback, {
          withStartIndices: true,
          normalizeWhitespace: parserOptions?.normalizeWhitespace || false,
        }),
      [domHandlerCallback, parserOptions]
    )

    const parseHtml = useCallback(
      (rawHtml: string): void => {
        const parser = new Parser(domHandler, {
          decodeEntities: parserOptions?.decodeEntities || true,
          recognizeSelfClosing: parserOptions?.recognizeSelfClosing || true,
        })
        parser.write(rawHtml.replace('\n', ''))
        parser.done()
      },
      [parserOptions, domHandler]
    )

    useEffect(() => {
      if (onLoading) {
        onLoading(true)
      }
      setLoading(true)
      parseHtml(html)
    }, [html, parseHtml, onLoading])

    const renderedHtml = useMemo(() => {
      let renderResult
      if (nodes) {
        renderResult = nodes.map((node) => renderDomNode(node))
      }
      setLoading(false)
      if (onLoading) {
        onLoading(false)
      }
      return renderResult
    }, [nodes, renderDomNode, onLoading])

    if (loading && LoaderComponent) {
      return <LoaderComponent />
    }

    return <Fragment>{renderedHtml}</Fragment>
  }
)

HTMLRenderer.displayName = 'HTMLRenderer'

export default HTMLRenderer
