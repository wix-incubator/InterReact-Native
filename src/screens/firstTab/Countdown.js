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
    const timeLeft = moment.duration(startTime-now);
    return moment.duration(timeLeft, 'minutes').format();
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
    return (
      <View>
        <Text>
          {this.state.leftTime}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
