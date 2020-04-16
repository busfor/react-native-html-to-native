# react-native-html-to-native

![npm](https://img.shields.io/npm/dw/@busfor/react-native-html-to-native?style=for-the-badge)
[![npm (tag)](https://img.shields.io/npm/v/@busfor/react-native-html-to-native/latest?style=for-the-badge)](https://www.npmjs.com/package/@busfor/react-native-html-to-native)
![](https://img.shields.io/npm/types/typescript?style=for-the-badge)

---

## Getting started

`$ yarn add @busfor/react-native-html-to-native`

## Properties

## Usage

```javascript
import HTML from '@busfor/react-native-html-to-native'
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

# TODO:

✅ Parse HTML into object structure

✅ Render parsed nodes on screen

✅ Add default renderers and styles

⬜️ Add default styles definitions

⬜️ Add documentation

✅ Add usage example

⬜️ Complete example app

✅ Add \<img> tag parsing

⬜️ Add siblings handling
