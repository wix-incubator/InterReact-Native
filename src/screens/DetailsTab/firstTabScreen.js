import moment from 'moment';
import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';
import Countdown, {TickEmitter} from './Countdown';
import LocationView from './LocationView';
import * as Constants from '../Constants';
import ParallaxView from 'react-native-parallax-view'


const locationSrc = require('../../images/location.png');

const {width} = Dimensions.get('window');

class FirstTabScreen extends Component {

  static navigatorStyle = {
    navBarBackgroundColor: Constants.navBarBackgroundColor,
    navBarTextColor: Constants.navBarTextColor,
    navBarHidden: true,
    navBarBlur: true,
  };

  constructor(props) {
    super(props);
    this.ticker = new TickEmitter('eventTicker');
  }

  rsvp(){
    Navigation.showModal({
      screen: 'details.RSVPScreen',
      title: 'RSVP',
      navigatorStyle: {},
      navigatorButtons: {
        rightButtons: [{
          title: 'Cancel',
          id: 'navBarCancel'
        }]
      }
    });
  }

  componentDidMount() {
    this.ticker.startInterval();
  }

  componentWillUnmount() {
    this.ticker.stopInterval();

  }
  render() {
    const {details} = this.props;
    const dateString = moment(details.startDate).format('MMMM DD • HH:mm');

    const marginVertical = Platform.OS == 'ios' ? 15 : 0;
    return (

      <View style={styles.container}>
        <Image style={{height: 120, marginVertical}} source={{uri: details.logoImageURL}} />
        <View style={styles.countdownSection}>
          <Countdown ticker={this.ticker} startTime={details.startDate}/>
        </View>

        <View style={styles.detailsSection}>
          <View style={{justifyContent: 'center', height: 100}}>
          {   /*<Text style={{color: '#ffffff', fontSize: 28, }}>{details.title}</Text>
                <Text style={{color: '#cad2c5', fontSize: 16, fontWeight: '500'}}>{details.description}</Text>*/}
            <View>
              <Text style={styles.detailsText}>{dateString} &#x2022;{' '}{details.city.toUpperCase()}</Text>
              <Text style={styles.detailsText, {fontSize: 15, color: '#cccccc'}}>{details.detailedLocation}</Text>
            </View>
          </View>
          <View style={styles.mapContainer}>
          <LocationView
              title={details.title}
              description={details.detailedLocation}
              latitude={details.location.latitude}
              longitude={details.location.longitude}
            >
            </LocationView>
          </View>
          <View style={styles.rsvpSection}>
            <TouchableOpacity style={styles.rsvpButton} onPress={this.rsvp}>
              <Text style={styles.rsvpButtonText}>RSVP</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },
  countdownSection: {
    paddingTop: 10,
    backgroundColor: '#ebebeb',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: '#165574',
    alignItems: 'center',
    padding: 2,
  },
  rsvpSection: {
    height: 80,
    padding: 15,
    backgroundColor: '#165574',
  },
  rsvpButton: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 12,
    paddingLeft: 100,
    paddingRight: 100,
    width: width - 40,
    borderRadius: 3,
  },
  rsvpButtonText: {
    color: '#ebebeb',
    fontSize: 20,
    textAlign: 'center'
  },
  detailsText: {
    color: '#ffffff',
    fontSize: 27,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default connect(mapStateToProps)(FirstTabScreen);
