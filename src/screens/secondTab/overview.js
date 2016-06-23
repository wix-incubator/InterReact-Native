import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import _ from 'lodash';
const {width} = Dimensions.get('window');
import BarChart from './BarChart';


const Overview = ({attendees}) =>
  <View style={styles.container}>
    <Text style={{fontSize: 28, color: '#52489c', fontWeight: '500'}}>{attendees.attendeesData.length} GUESTS ATTENDING</Text>
    <View style={{marginTop: 10}}>
      <Text>Company</Text>
      <BarChart groupFn={() => group(attendees.attendeesData, 'org')} />
      <Text>Experience</Text>
      <BarChart groupFn={() => group(attendees.attendeesData, 'experience')} />
    </View>

  </View>
;

function group(attendees, field) {
  return _.groupBy(attendees, field);
}

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ebebeb'
  },
  orgLength: {
    backgroundColor: '#59C3C3',
    padding: 5,
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 1,
  },
  orgLabel: {
    alignSelf: 'center',
    flex: 1
  },
  orgName: {
    fontSize: 18,
    color: '#fff'
  },
  row: {
    backgroundColor: 'green',
    flexDirection: 'column',
    padding: 4,
    margin: 4
  }
});