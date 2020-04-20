import { StyleSheet } from 'react-native'

import type { NodeStyle } from '../types'

export default StyleSheet.create({
  p: {
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  code: {
    padding: 8,
    backgroundColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  nav: {
    flex: 1,
    flexWrap: 'wrap',
  },
  mark: {
    flex: 1,
    flexWrap: 'wrap',
  },
  blockquote: {
    margin: 8,
    padding: 8,
    backgroundColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
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
  TextNode: {
    fontSize: 20,
  },
}) as { [s: string]: NodeStyle }
