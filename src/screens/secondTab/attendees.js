import React from 'react';
import {View, Text, StyleSheet, ListView} from 'react-native';
import Attendee from './attendee';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


const renderRow = data => <Attendee {...data} />;

const Attendees = ({attendees}) =>
  <View style={styles.container}>
    <ListView
      dataSource={ds.cloneWithRows(attendees.attendeesData)}
      renderRow={renderRow}
    />
  </View>;

export default Attendees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ebebeb'
  }
});