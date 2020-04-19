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
    TextNode: {
      fontSize: 35,
    },
    'a.link': {
      width: 100,
      height: 50,
    },
    'a.link>TextNode': {
      fontSize: 50,
    },
    img: {
      width: 300,
      height: 200,
    },
  }
  renderers={{
    'a.link': (node, renderChildren, style, props) => (
      <TouchableHighlight onPress={() => console.log('Clicked', node.attributes.href)} style={style}>
        {renderChildren(node.children)}
      </TouchableHighlight>
    ),
  }}
  html='<div><p>Paragraph</p><a class="link" href="https://www.google.com/">Link</a><img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/>'
/>
```

# Docs

## Properties

| Name            | Description                              |            |
| --------------- | ---------------------------------------- | ---------- |
| **html**        | Raw HTML code to be parsed and presented | _required_ |
| **renderers**   | HTML nodes render functions              | _optional_ |
| **passProps**   | Custom props passed to node renderer     | _optional_ |
| **styles**      | Custom node styles                       | _optional_ |
| **onError**     | Error callback function                  | _optional_ |
| **onLinkPress** | Link press callback function             | _optional_ |

## Types

**Node** - object which describes HTML node

_data_ - text data(for texts inside \<p>, \<h1> and other text tags)
_name_ - tag name(fot tags)
_parent_ - parent **Node**
_siblings_ - **nodes** which are siblings for current **Node**(same DOM level)
_attributes_ - HTML tag attributes of type **NodeAttributes**
_selectors_ - CSS selectors for nodes to be used in styles or renderers

**NOTE!** Nodes for text data have custom selector TextNode

_Example:_

```html
<p>Example text</p>
```

After parsing styling and rendering of "Example text" could be done by using selectors _p>TextNode_ and _TextNode_

---

**NodeStyle** - object of _selector : style_, possibly created with StyleSheet.create

---

**NodeAttributes** - HTML attributes of node(e.g. _href_, _class_ etc.)

---

**ElementRenderer** - (node, renderChildren, style, props) => ReactNode

Function for rendering html node as native components

Should accept _node_ of type _Node_, _renderChildren_ function for rendering node's children, _style_ of type **NodeStyle** and _props_ of type **ElementProps**

Should return **ReactNode**

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

✅ Parse HTML into object structure

✅ Render parsed nodes on screen

✅ Add default renderers and styles

⬜️ Add default styles definitions

✅ Add documentation

✅ Add usage example

⬜️ Complete example app

✅ Add \<img> tag parsing

✅ Add siblings handling

✅ Add html entities decoding
