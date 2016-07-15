import _ from 'lodash';
import EventEmitter from 'events';
const moment = require('moment');
require('moment-duration-format');
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';


export default class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: this.calcElapsedTime(this.props.startTime),
      leftTime: this.calcTimeLeft(this.props.startTime)
    };

    this.tickCallback = () => {
      this.setState({
        elapsedTime: this.calcElapsedTime(this.props.startTime),
        leftTime: this.calcTimeLeft(this.props.startTime)
      });
    }
  }

  componentDidMount() {
    this.props.ticker.on(this.props.ticker.eventName, this.tickCallback);
  }

  componentWillUnmount() {
    this.props.ticker.removeListener(this.props.ticker.eventName, this.tickCallback);
  }

  calcElapsedTime(startTime) {
    const now = Date.now();
    const timeElapsed = moment.duration(now - startTime);
    //console.error('##########', moment(timeElapsed, "mm"));
    return moment.duration(timeElapsed, 'minutes').format();
  }

  calcTimeLeft(startTime) {
    const now = Date.now();
    return moment.duration(startTime-now);
    // return moment.duration(timeLeft, 'minutes').format();
  }
}

export class TickEmitter extends EventEmitter {
  constructor(eventName) {
    super();
    this.eventName = eventName;
  }

  startInterval(time = 1000) {
    this.interval = setInterval(() => {
      this.emit(this.eventName);
    }, time);
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    delete this.interval;
  }

}


export default class Countdown extends TimerComponent {

  render() {
    const now = Date.now()
    if (now >= this.props.startTime) {
      // Time has passed
      return (
        <View style={styles.container, {backgroundColor: '#24b37a'}}>
          <Text style={{fontSize: 50, color: '#ffffff', textAlign: 'center'}}>Began!</Text>
        </View>
      );

    }

    const countdown = [{value: this.state.leftTime.days(), label: 'DAYS'},
                       {value: this.state.leftTime.hours(), label: 'HRS'},
                       {value: this.state.leftTime.minutes(), label: 'MINS'},
                       {value: this.state.leftTime.seconds(), label: 'SECS'}];
    return (
      <View style={styles.container}>

        {_.map(countdown, (timeUnit, index) => (
          <View key={index} style={styles.timeUnit}>
            <Text style={styles.timeUnitText}>
              {timeUnit.value}
            </Text>
            <View style={styles.timeUnitLabel}>
              <Text style={styles.timeUnitLabelText}>{timeUnit.label}</Text>
            </View>
          </View>))
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingRight: 30
  },
  timeUnit: {
    width: 60,
    height: 50
  },
  timeUnitText: {
    fontSize: 40,
    color: '#52489c',
  },
  timeUnitLabel: {
    position: 'absolute',
    top: -7,
    left: 0
  },
  timeUnitLabelText: {
    fontSize: 10,
    color: '#52489c',
  }
});
