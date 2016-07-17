import _ from 'lodash';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  AlertIOS,
  ScrollView
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import BarChart from '../GuestsTab/BarChart';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';

const LOGIN_SCREEN = 'loginScreen'

import * as Constants from '../Constants'

class LoginScreen extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'cancel', // for a textual button, provide the button title (label)
        id: 'cancel', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        disableIconTint: true
        }
      ]
  };

  static navigatorStyle = {

  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      screenState: LOGIN_SCREEN
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'cancel') {
        Navigation.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
      }
    }
  }

  renderLoginScreen() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Please enter your password:</Text>
        <TextInput style={styles.input} secureTextEntry={true}/>
        <TouchableOpacity style={styles.submitButton}><Text style={{color: 'white'}}>Login</Text></TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.screenState == LOGIN_SCREEN) {
      return this.renderLoginScreen();
    }
    return (
      <View></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#31a39c',
  },
  input: {
    marginTop: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ebebeb',
    color: '#ffffff',
    paddingLeft: 8,
    textAlign: 'center',
  },
  submitButton: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 12,
    paddingLeft: 100,
    paddingRight: 100,
    marginTop: 20,
  },
});

export default connect(mapStateToProps)(LoginScreen);
