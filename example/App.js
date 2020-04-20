import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  Text,
} from 'react-native';
import {HTMLView} from '@busfor/react-native-html-to-native';

export default () => (
  <SafeAreaView>
    <HTMLView
      onLinkPress={(url) => console.log(url)}
      onError={(err) => console.log(err)}
      styles={styles}
      renderers={{
        'a.link': (node, renderChildren, style, props) => (
          <TouchableHighlight
            key={node.selectors[0]}
            onPress={() => console.log('Clicked', props.attributes.href)}
            style={style}>
            <Text style={style}>{renderChildren(node.children)}</Text>
          </TouchableHighlight>
        ),
      }}
      html={html}
    />
  </SafeAreaView>
);

const html =
  '<div><p>Paragraph</p></div><a class="link" href="Test">Link</a><img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" /><p><a>Link</a> in text</p><a>Default link</a><p><ul><li>Item</li><li>Item 2</li></ul></p>';

const styles = StyleSheet.create({
  'a.link': {
    width: 100,
    height: 50,
  },
  a: {
    color: 'green',
    fontSize: 16,
  },
  img: {
    width: 300,
    height: 200,
  },
  p: {
    fontSize: 16,
    alignItems: 'flex-end',
  },
  li: {
    color: 'red',
  },
});
