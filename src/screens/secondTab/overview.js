import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import _ from 'lodash';

const Overview = ({attendees}) =>
  <View>
    <Text>{attendees.attendeesData.length} Guests</Text>
    <ByOrg attendees={attendees.attendeesData} />
  </View>
;

function byOrg(attendees) {
  return _.groupBy(attendees, 'org');
}

function ByOrg({attendees}) {
  console.log('boo', byOrg(attendees));
  return (
    <View>
      {
        Object.keys(attendees).map(org => <Text key={org}>{attendees[org].length}</Text>)
      }
      <Text>
        Hello
      </Text>
    </View>

  )
}

export default Overview;

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'green',
    flexDirection: 'column',
    padding: 4,
    margin: 4
  },
});