import React from 'react';
import {StyleSheet, SafeAreaView, TouchableHighlight} from 'react-native';
import {HTMLView} from 'react-native-html-to-native';

export default () => (
  <SafeAreaView>
    <HTMLView
      onLinkPress={(url) => console.log(url)}
      onError={(err) => console.log(err)}
      styles={styles}
      renderers={{
        'a.link': (node, renderChildren, style, props) => {
          console.log(node.children);
          return (
            <TouchableHighlight
              onPress={() => console.log('Clicked', node.attributes.href)}
              style={style}>
              <>{renderChildren(node.children)}</>
            </TouchableHighlight>
          );
        },
      }}
      {...{html}}
    />
  </SafeAreaView>
);

const html =
  '<div><p>Paragraph</p></div><a class="link" href="Test">Link</a><img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />';

const styles = StyleSheet.create({
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
});
