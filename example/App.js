import React from 'react';
import {StyleSheet} from 'react-native';
import {HTMLView} from 'react-native-html-to-native';

export default () => <HTMLView styles={styles} {...{html}} />;

const html = '<div><p>Text</p></div>';

const styles = StyleSheet.create({
  div: {
    flex: 1,
  },
  'div>p': {
    fontSize: 35,
  },
});
