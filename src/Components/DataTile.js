import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

const DataTile = props => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.viewStyleShort}>
        <Text style={styles.textStyleDark}>{props.title}</Text>
      </View>
      <View style={styles.viewStyleShort}>
        <Text style={styles.textStyle}>{props.value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStyleShort: {
    height: 50,
    width: '50%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: '300',
    fontSize: 16,
    letterSpacing: 0.5,
    marginStart: 0,
  },
  textStyleDark: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    marginStart: 20,
  },
  bodyView: {flex: 1, backgroundColor: 'white'},
});

export default DataTile;
