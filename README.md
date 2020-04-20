# react-native-html-to-native

![npm](https://img.shields.io/npm/dw/@busfor/react-native-html-to-native?style=for-the-badge)
[![npm (tag)](https://img.shields.io/npm/v/@busfor/react-native-html-to-native/latest?style=for-the-badge)](https://www.npmjs.com/package/@busfor/react-native-html-to-native)
![](https://img.shields.io/npm/types/typescript?style=for-the-badge)

Library for parsing HTML code into native iOS and Android components with CSS selector-like styling and rendering

---

# Getting started

`$ yarn add @busfor/react-native-html-to-native`

## Usage

```javascript
import { HTMLView } from '@busfor/react-native-html-to-native'
```

```jsx
<HTMLView
  onLinkPress={(url) => console.log(url)}
  onError={(err) => console.log(err)}
  styles={{
    'a.link': {
      width: 100,
      height: 50,
      fontSize: 50,
    },
    img: {
      width: 300,
      height: 200,
    },
    a: {
      color: 'green',
    },
  }
  renderers={{
    'a.link': (node, renderChildren, style, props) => (
      <TouchableHighlight
        key={node.selectors[0]}
        onPress={() => console.log('Clicked', props.attributes.href)}
        style={style}>
        {renderChildren(node.children)}
      </TouchableHighlight>
    ),
  }}
  html='<div><p>Paragraph</p><a class="link" href="https://www.google.com/">Link</a><img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/>'
/>
```

# Docs

## Properties

| Name              | Description                              | Type            |
| ----------------- | ---------------------------------------- | --------------- |
| **html\***        | Raw HTML code to be parsed and presented | string          |
| **renderers**     | HTML nodes render functions              | Object          |
| **passProps**     | Custom props passed to node renderer     | Object          |
| **styles**        | Custom node styles                       | Object          |
| **onError**       | Error callback function                  | Function        |
| **onLinkPress**   | Link press callback function             | Function        |
| **parserOptions** | Parser options, see _ParserOptions_ type | _ParserOptions_ |

\* - required property

## Types

**ParserOptions**

| Option                   | Description                                                     | Type    | Default |
| ------------------------ | --------------------------------------------------------------- | ------- | ------- |
| **normalizeWhitespace**  | Indicates whether whitespace in text nodes should be normalized | boolean | _false_ |
| **recognizeSelfClosing** | Recognize self-closing HTML tags                                | boolean | _true_  |
| **decodeEntities**       | If set to true, entities within HTML code will be decoded       | boolean | _true_  |

---

**Node** - object which describes HTML node

| Parameter      | Description                                                      | Type             |
| -------------- | ---------------------------------------------------------------- | ---------------- |
| **data**       | Text data for text nodes, undefined otherwise                    | string           |
| **name**       | Tag name for HTML tags, _TextNode_ for textual nodes             | string           |
| **parent**     | Parent _Node_                                                    | _Node_           |
| **children**   | Children _nodes_                                                 | Array<_Node_>    |
| **siblings**   | _Nodes_ which are siblings for current node(same DOM level)      | Array<_Node_>    |
| **attributes** | HTML tag attributes of type _NodeAttributes_                     | _NodeAttributes_ |
| **selectors**  | CSS-like selectors for _Node_ to be used in styles and renderers | Array\<string>   |

**NOTE!** Nodes for text data have custom selector TextNode

_Example:_

```html
<p>Example text</p>
```

After parsing styling and rendering of "Example text" could be done by using selectors _p>TextNode_ and _TextNode_

---

**NodeStyle** - object of _selector : style_ key-values, possibly created with StyleSheet.create

---

**NodeAttributes** - HTML attributes of node(e.g. _href_, _class_ etc.)

---

**ElementRenderer** - (node, renderChildren, style, props) => ReactNode

Function for rendering html node as native components

Should accept _node_ of type _Node_, _renderChildren_ function for rendering node's children, _style_ of type **NodeStyle** and _props_ of type **ElementProps**

Should return **ReactNode**

**NOTE!**

_Good practice_: Set **key** property for render component to _node.selectors[0]_ as it is most accurate CSS selector(tag path) to rendering node. See usage example above.

---

**ElementProps** - object containing _attributes_ of type **NodeAttributes**, _handleLinkPress_ function for handling link presses which accepts parameter _url_ of type **String**(possibly overridden by **onLinkPress** parameter of HTMLRenderer component) and _passProps_(also parameter from HTMLRenderer component)

## Default renderers

Some HTML tags are rendered by default, some are skipped while rendering.

To know how HTML tags are rendered and how to use **ElementRenderer** functions see [default renderers](src/defaults/renderers.tsx)

## Default styles

Some default styles for tags could be specified in this library

To see what styles are default for tags see [default styles](src/defaults/styles.ts)

# Issues and contributing

Feel free to report any bug or request any functionality you would like to be done with [Open Issue](https://github.com/busfor/react-native-html-to-native/issues/new) functionality of GitHub

Also feel free to fork and contribute by opening [Pull Request](https://github.com/busfor/react-native-html-to-native/compare). All pull requests will be reviewed and merged if everything is OK!

# TODO:

⬜️ Add parsing progress indication and status

⬜️ Add proper default table render

⬜️ Add proper ordered lists indicators

⬜️ Improve CSS selectors

⬜️ Complete example app

⬜️ Add HTML parsing from URL
