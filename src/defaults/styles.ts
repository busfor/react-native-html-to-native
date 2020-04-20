import { StyleSheet } from 'react-native'

import type { NodeStyle } from '../types'

export default StyleSheet.create({
  p: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 12,
  },
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 20,
  },
  h3: {
    fontSize: 18,
  },
  h4: {
    fontSize: 16,
  },
  h5: {
    fontSize: 14,
  },
  h6: {
    fontSize: 10,
  },
  b: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  strong: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  small: {
    fontSize: 8,
  },
  i: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  u: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  li: {
    fontSize: 12,
  },
  nav: {
    fontSize: 12,
  },
  mark: {
    fontSize: 12,
  },
  sub: {
    fontSize: 12,
  },
  abbr: {
    fontSize: 12,
  },
  address: {
    fontSize: 12,
  },
  code: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    backgroundColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    width: '100%',
    fontSize: 12,
  },
  blockquote: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    backgroundColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    width: '100%',
    fontSize: 12,
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
  a: {
    fontSize: 12,
    color: 'blue',
  },
}) as { [s: string]: NodeStyle }
