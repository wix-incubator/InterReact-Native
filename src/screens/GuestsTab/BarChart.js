import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import _ from 'lodash';
const {width} = Dimensions.get('window');

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
          friction: 5,
          tension: 1
        }).start(),
      100);
  }

  render() {
    const {name, length} = this.props;
    return (
      <View style={{flexDirection: 'row', padding: 5}}>

        <Animated.View style={[styles.orgLength, {width: this.state.barWidth}]}>
        </Animated.View>
        <View style={styles.orgLabel}>
          <Text style={{textAlign: 'right', fontSize: 18,}}>{length}</Text>
        </View>
        <View style={{position: 'absolute', top: 18, left: 10, backgroundColor: 'transparent'}}>
          <Text style={[styles.orgName]}>{name}</Text>
        </View>
      </View>
    );
  }

}

export default function BarChart({groupFn}) {
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ebebeb'
  },
  orgLength: {
    backgroundColor: '#84A98C',
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
