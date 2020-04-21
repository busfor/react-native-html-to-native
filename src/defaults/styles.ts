import { StyleSheet } from 'react-native'

import type { NodeStyle } from '../types'

export default StyleSheet.create({
  TextNode: {
    fontSize: 12,
  },
  br: {
    width: '100%',
  },
  li: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  p: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  TextWrap: {
    width: '100%',
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
  table: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  tr: {
    flexDirection: 'row',
    width: '100%',
  },
  th: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  'th>TextNode': {
    fontWeight: 'bold',
  },
  td: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  thead: {
    flexDirection: 'row',
    width: '100%',
  },
  tfoot: {
    flexDirection: 'row',
    width: '100%',
  },
  tbody: {
    flexDirection: 'column',
    width: '100%',
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
  'ol>li>ol': {
    marginLeft: 4,
  },
}) as { [s: string]: NodeStyle }
