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

**ElementRenderer** -

Should return **ReactNode**

---

**ElementProps** -

---

## Selectors

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

⬜️ Add CSS selectors docs

⬜️ Update props docs

⬜️ Add parsing progress indication and status

⬜️ Improve CSS selectors

⬜️ Complete example app

⬜️ Add HTML parsing from URL
