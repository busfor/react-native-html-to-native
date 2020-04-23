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
  styles={styles}
  renderers={{
    'a.link': (renderedChildren, style, props) => {
      return (
        <TouchableOpacity key={props.key} onPress={() => console.log('Clicked', props.attributes.href)} style={style}>
          {renderedChildren}
        </TouchableOpacity>
      )
    },
  }}
  html={'<div><p>Paragraph</p></div>'}
  onLoading={(loading) => console.log(loading)}
/>
```

# Docs

## Properties

| Name              | Description                                                            | Type            |
| ----------------- | ---------------------------------------------------------------------- | --------------- |
| **html\***        | Raw HTML code to be parsed and presented                               | string          |
| **renderers**     | HTML nodes render functions                                            | Object          |
| **passProps**     | Custom props passed to node renderer                                   | Object          |
| **styles**        | Custom node styles                                                     | Object          |
| **onError**       | Error callback function                                                | Function        |
| **onLinkPress**   | Link press callback function                                           | Function        |
| **parserOptions** | Parser options, see _ParserOptions_ type                               | _ParserOptions_ |
| **onLoading**     | Loading state callback, only parameter is loadingState of type boolean | Function        |
| **renderLoading** | Function to render custom loading indicator                            | Function        |

\* - required property

## Types

**ParserOptions**

| Option                   | Description                                                     | Type    | Default |
| ------------------------ | --------------------------------------------------------------- | ------- | ------- |
| **normalizeWhitespace**  | Indicates whether whitespace in text nodes should be normalized | boolean | _false_ |
| **recognizeSelfClosing** | Recognize self-closing HTML tags                                | boolean | _true_  |
| **decodeEntities**       | If set to true, entities within HTML code will be decoded       | boolean | _true_  |

---

**ElementRenderer** - function for rendering html nodes as native elements

(_renderedChildren_: **Array\<ReactNode>**, _style_: **StyleProp\<any>**, _props_: **ElementProps**) => **ReactNode**

Function accepts rendered node's children, node's style and props

Should return **ReactNode**

For more see **Default renderers**

---

**ElementProps** - props of rendering HTML node

| Name            | Description                                           | Type                |
| --------------- | ----------------------------------------------------- | ------------------- |
| attributes      | HTML tag attributes                                   | Object or undefined |
| passProps       | Custom props passed to component render from HTMLView | Object              |
| handleLinkPress | Link press handler function                           | Function            |
| node            | HTML node for which element is rendered               | Node                |
| children        | Node's children array                                 | Array\<Node>        |
| siblings        | Node's siblings array                                 | Array\<Node>        |
| parent          | Node's parent                                         | Node                |
| data            | Text data for text nodes                              | string              |
| key             | Unique key for component rendering                    | string              |

---

## Selectors

Selectors system built in a CSS-like manner

To select element by tag name just use it as is: _ol_, _p_, etc.

For selecting by class or id use _.class_ and _#id_. For more specific selection of component with class(same for component with id) use it like: _p.class_

Also it is possible to select HTML node by path like _ol>li_ or _ol.class>li#id_ etc.

Some HTML node have custom selectors. Text nodes are rendered as React Native \<Text> components and can be accessed by _TextNode_ selector. Same for list items indicators nodes - access it by _IndicatorNode_ selector.

For more examples of using selectors see **Usage**, **Example app** and **Default renderers and styles**

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

⬜️ Improve CSS selectors

⬜️ Complete example app

⬜️ Add HTML parsing from URL
