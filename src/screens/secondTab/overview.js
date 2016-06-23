import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import _ from 'lodash';
const {width} = Dimensions.get('window');


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
        <Animated.View style={[styles.orgLength, {width: this.state.barWidth}]}>
          <Text style={styles.orgName}>{name}</Text>
        </Animated.View>
        <View style={styles.orgLabel}>
          <Text style={{textAlign: 'right', fontSize: 18,}}>{length}</Text>
        </View>
      </View>
    );
  }

}

function BarChart({groupFn}) {
  const grouped = groupFn();
  const sorted = Object.keys(grouped).sort((a, b) => grouped[a].length < grouped[b].length ? 1 : - 1);
  const maxLength = grouped[sorted[0]].length;
  return (
    <View>
      {
        sorted.map(org => <Org key={org} name={org} length={grouped[org].length} maxLength={maxLength} />)
      }
    </View>
  )
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