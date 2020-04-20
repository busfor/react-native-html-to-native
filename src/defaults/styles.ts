import { StyleSheet } from 'react-native'

import type { NodeStyle } from '../types'

export default StyleSheet.create({
  TextNode: {
    fontSize: 12,
  },
  ul: {
    width: '100%',
  },
  ol: {
    width: '100%',
  },
  p: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  'h1>TextNode': {
    fontSize: 24,
  },
  'h2>TextNode': {
    fontSize: 20,
  },
  'h3>TextNode': {
    fontSize: 18,
  },
  'h4>TextNode': {
    fontSize: 16,
  },
  'h5>TextNode': {
    fontSize: 14,
  },
  'h6>TextNode': {
    fontSize: 10,
  },
  'b>TextNode': {
    fontWeight: 'bold',
  },
  'strong>TextNode': {
    fontWeight: 'bold',
  },
  'small>TextNode': {
    fontSize: 8,
  },
  'i>TextNode': {
    fontStyle: 'italic',
  },
  'u>TextNode': {
    textDecorationLine: 'underline',
  },
  code: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    backgroundColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    width: '100%',
  },
  blockquote: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    backgroundColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    width: '100%',
  },
  tr: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  th: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  td: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tfoot: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tbody: {
    flexDirection: 'column',
  },
  hr: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
  img: {
    width: 100,
    height: 100,
  },
  'a>TextNode': {
    color: 'blue',
  },
}) as { [s: string]: NodeStyle }
