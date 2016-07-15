import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Attendee = ({name, org}) =>
  <View style={styles.row}>
    <Text style={styles.nameText}>{name}</Text>
    <Text style={styles.companyText}>{org}</Text>
  </View>
;

export default Attendee;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    padding: 4,
    margin: 4
  },
  nameText: {
    fontSize: 22,
    color: '#52489c'
  },
  companyText: {
    fontSize: 16,
    color: '#000000'
  }
});