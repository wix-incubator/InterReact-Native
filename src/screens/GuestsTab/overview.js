import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, ScrollView} from 'react-native';
import _ from 'lodash';
const {width} = Dimensions.get('window');
import BarChart from './BarChart';


const Overview = ({attendees}) => {

  const attendeesData = _.get(attendees, 'attendeesData');
  if (attendeesData) {
    return (<View style={styles.container}>
      <Text style={{fontSize: 28, color: '#52489c', fontWeight: '500'}}>{attendeesData.length} GUESTS ATTENDING</Text>
      <View style={{marginTop: 10}}>
        <ScrollView contentInset={{top: 0, left: 0, bottom: 300, right: 0}} showsVerticalScrollIndicator={false}>
          <Text>Company</Text>
          <BarChart groupFn={() => group(attendeesData, 'org')} />
          <Text>Experience</Text>
          <BarChart groupFn={() => group(attendeesData, 'experience')} />
        </ScrollView>
      </View>

    </View>);

  }
  return null;
};

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
    setTimeout(() =>
      Animated.spring(this.state.barWidth, {
        toValue: (width - 100) * (this.props.length/this.props.maxLength),
        friction: 9,
      }).start(),
      100);
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
