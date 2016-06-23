import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Attendee = ({name, org}) =>
  <View style={styles.row}>
    <Text>{name}</Text>
    <Text>{org}</Text>
  </View>
;

export default Attendee;

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'green',
    flexDirection: 'column',
    padding: 4,
    margin: 4
  },
});