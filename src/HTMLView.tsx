import React, { Fragment, ReactNode, memo, useState, useEffect, useCallback, useMemo } from 'react'
import { Linking } from 'react-native'
import type { StyleProp } from 'react-native'
import { Parser } from 'htmlparser2-without-node-native'
import { DomHandler } from 'domhandler'
import * as DomUtils from 'domutils'
import type { Node as DomNode, Element as DomElement, DataNode as DomText } from 'domhandler'

import type { HTMLRendererProps, ElementRenderer, ElementProps } from './types'
import Defaults from './defaults'

const HTMLRenderer = memo(
  ({ html, renderers, styles, passProps, onError, onLinkPress, parserOptions }: HTMLRendererProps) => {
    const [dom, setDom] = useState<DomNode[]>(null)

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
      (domNode: DomNode, previousSelectors?: string[]): ReactNode => {
        if (DomUtils.isTag(domNode)) {
          const tag = domNode as DomElement
          const name = DomUtils.getName(tag)
          const htmlClasses = DomUtils.getAttributeValue(tag, 'class')?.split(' ') || []
          const htmlIds = DomUtils.getAttributeValue(tag, 'id')?.split(' ') || []

          const selectors: string[] = [name]
          htmlClasses.forEach((htmlClass) => {
            selectors.unshift(`.${htmlClass}`)
            selectors.unshift(`${name}.${htmlClass}`)
          })

          let tempSelectors = [...selectors]
          htmlIds.forEach((htmlId) => {
            selectors.unshift(`#${htmlId}`)
            tempSelectors.forEach((selector) => {
              selectors.unshift(`${selector}#${htmlId}`)
            })
          })

          tempSelectors = [...selectors]
          previousSelectors?.reverse().forEach((parentSelector) => {
            tempSelectors.forEach((selector) => {
              selectors.unshift(`${parentSelector}>${selector}`)
            })
          })

          const children = DomUtils.getChildren(tag)
          const siblings = DomUtils.getSiblings(tag)
          const parent = DomUtils.getParent(tag)

          const props: ElementProps = {
            attributes: tag.attribs,
            handleLinkPress,
            passProps,
            children,
            siblings,
            parent,
            key: selectors[0],
          }
          const renderer = getRenderer(selectors)
          let style = getStyle(selectors)

          let renderedChildren = null
          if (DomUtils.hasChildren(tag)) {
            if (children.some((child) => child.type !== 'text')) {
              style = { ...style, ...Defaults.styles.TextWrap }
            }
            renderedChildren = children.map((child) => renderDomNode(child, selectors))
          }
          if (renderer) {
            return renderer(renderedChildren, style, props)
          } else {
            return renderedChildren
          }
        } else if (DomUtils.isText(domNode)) {
          const text = domNode as DomText
          const name = 'TextNode'
          const data = DomUtils.getText(text)

          const selectors: string[] = [name]
          previousSelectors?.reverse().forEach((parentSelector) => {
            selectors.unshift(`${parentSelector}>${name}`)
          })

          const siblings = DomUtils.getSiblings(text)
          const parent = DomUtils.getParent(text)

          const props: ElementProps = {
            passProps,
            siblings,
            parent,
            data,
            key: selectors[0],
          }
          const renderer = getRenderer(selectors)
          let style = getStyle(selectors)

          if (renderer) {
            return renderer(null, style, props)
          }
        }
        return null
      },
      [handleLinkPress]
    )

    const domHandlerCallback = useCallback(
      (err: Error, parsedDom: DomNode[]) => {
        if (err) {
          handleParseError(err)
        } else {
          setDom(parsedDom)
        }
      },
      [handleParseError]
    )

    const domHandler = useMemo(
      () => new DomHandler(domHandlerCallback, { normalizeWhitespace: parserOptions?.normalizeWhitespace || false }),
      [domHandlerCallback, parserOptions]
    )

    const parseHtml = useCallback(
      (rawHtml: string): void => {
        const parser = new Parser(domHandler, {
          decodeEntities: parserOptions?.decodeEntities || true,
          recognizeSelfClosing: parserOptions?.recognizeSelfClosing || true,
        })
        parser.write(rawHtml)
        parser.done()
      },
      [parserOptions, domHandler]
    )

    useEffect(() => {
      parseHtml(html)
    }, [html, parseHtml])

    const renderedHtml = useMemo(() => dom && dom.map((domNode) => renderDomNode(domNode)), [dom, renderDomNode])

    return <Fragment>{renderedHtml}</Fragment>
  }
)

HTMLRenderer.displayName = 'HTMLRenderer'

export default HTMLRenderer
