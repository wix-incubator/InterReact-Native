import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import _ from 'lodash';
const {height, width} = Dimensions.get('window');


const Overview = ({attendees}) =>
  <View>
    <Text>{attendees.attendeesData.length} Guests</Text>
    <ByOrg attendees={attendees.attendeesData} />
  </View>
;

function byOrg(attendees) {
  return _.groupBy(attendees, 'org');
}

class Org extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barWidth: new Animated.Value(0)
    }
  }

  componentDidMount() {
    //console.error('here')
    setTimeout(() =>
      Animated.spring(this.state.barWidth, {
        toValue: (width - 100) * (this.props.length/this.props.maxLength),
        friction: 5
      }).start(),
      500);
  }

  render() {
    const {name, length} = this.props;
    return (
      <View style={{flexDirection: 'row', padding: 5}}>

        <Animated.View style={[styles.orgLength, {width: this.state.barWidth}]}><Text style={styles.orgName}>{name}</Text></Animated.View>
        <View style={styles.orgLabel}><Text style={{textAlign: 'right'}}>{length}</Text></View>

      </View>
    );
  }

}

function ByOrg({attendees}) {
  const grouped = byOrg(attendees);
  const sorted = Object.keys(grouped).sort((a, b) => grouped[a].length < grouped[b].length ? 1 : - 1);
  const maxLength = grouped[sorted[0]].length;
  return (
    <View>
      <Text>Organizations Represented</Text>
      {
        sorted.map(org => <Org key={org} name={org} length={grouped[org].length} maxLength={maxLength} />)
      }
    </View>

  )
}

export default Overview;

const styles = StyleSheet.create({
  orgLength: {backgroundColor: 'blue', height: 30, margin: 10},
  orgLabel: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1
  },
  orgName: {
    color: '#fff'
  },
  row: {
    backgroundColor: 'green',
    flexDirection: 'column',
    padding: 4,
    margin: 4
  }
});