import _ from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  View,
  PixelRatio,
  TouchableOpacity,
  Animated,
  AlertIOS,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';

import * as Constants from '../Constants'

class ArchiveScreen extends Component {

  static navigatorStyle = {
    navBarBackgroundColor: Constants.navBarBackgroundColor,
    navBarTextColor: Constants.navBarTextColor,
    navBarTranslucent: true,
    drawUnderNavBar: true,
    navBarBlur: true,
  };

  constructor(props) {
    super(props);


  }


  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == '') {

      }
    }
  }

  eventClicked(event) {
    this.props.navigator.push({
      screen: 'example.EventMaterialsScreen',
      title: event.details.title,
      passProps: {event},
    })
  }

  renderEvent(event) {
    const details = event.details;
    const dateString = moment(details.startDate).format('DD/MM/YYYY');
    return (
      <TouchableOpacity onPress={() => this.eventClicked.bind(this)(event)}>
        <View key={event.title} style={styles.talkContainer}>
          <Text style={styles.dateText}>{dateString}</Text>
          <Text style={styles.titleText}>{details.title}</Text>
          <Text style={styles.contentText}>{details.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer} contentInset={{top: 60}} contentOffset={{y: -60}}>
        <View style={styles.talksContainer}>
          {_.map(this.props.events, (event) => this.renderEvent.bind(this)(event))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  talksContainer: {
    flex: 1,
    padding: 10,
  },
  talkContainer: {
    paddingTop: 20,
    borderRadius: 3,
    backgroundColor: '#165574',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  presenterImage: {
    borderRadius: 35,
    borderColor: '#cccccc',
    borderWidth: 1,
    width: 70,
    height: 70,
  },
  titleText: {
    fontSize: 20,
    color: 'white',
  },
  contentText: {
    paddingTop: 5,
    color: 'white'
  },
  contentBelowText: {
    color: 'white',
    paddingTop: 0,
    padding: 20,
  },

  dateContainer: {
    justifyContent: 'flex-end',
  },
  dateText: {
    color: 'white',
    opacity: 0.6,
    fontSize: 10,
  }

});

function mapStateToProps(state) {
  return state.archive
}

export default connect(mapStateToProps)(ArchiveScreen);
