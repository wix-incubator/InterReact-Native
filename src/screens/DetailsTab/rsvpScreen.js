import _ from 'lodash';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {mapStateToProps} from '../../store';
import * as actions from '../../store/constants/actions';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

const form = [{label: 'NAME', input: 'name'}, {label: 'COMPANY', input: 'org'}, {label: 'EXPERIENCE', input: 'experience'}]

class FirstTabScreen extends Component {

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.guest = {
      name: '',
      company: '',
      experience: ''
    };
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'navBarCancel') {
        Navigation.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
      }
    }
  }

  submitRSVP() {
    //console.error(this.guest)
    if (this.guest.name != '' && this.guest.org != '' && this.guest.experience != '') {
      this.props.dispatch({type: actions.ATTENDEES_SEND_RSVP, data: this.guest});
      Navigation.dismissModal({
        animationType: 'slide-down'
      });
    }
    else {
      Alert.alert("Please enter your details above...");
    }

  }

  render() {
    const {details} = this.props;
    return (
      <View style={styles.container}>

        <View style={{marginBottom: 20}}>
          <Text style={{color: '#ffffff', fontSize: 28}}>{details.title}</Text>
          <Text style={{color: '#ffffff', fontSize: 16, fontWeight: '500'}}>{details.description}</Text>
        </View>

        {_.map(form, (field, index) => (
          <View key={index}>
            <View style={{marginBottom: 30}}>
              <Text style={{color: '#ffffff'}}>{field.label}</Text>
              <TextInput style={styles.input} style={styles.input} onChange={(event) => this.guest[field.input] = event.nativeEvent.text}/>
            </View>
          </View>
        ))
          }

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.submitButton} onPress={() => this.submitRSVP()}>
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59c6cb',
    padding: 20,
  },
  inputLabel: {

  },
  input: {
    marginTop: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ebebeb',
    color: '#ffffff',
    paddingLeft: 8,
    borderRadius: 5,
  },
  submitButton: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 12,
    paddingLeft: 100,
    paddingRight: 100,
    borderRadius: 5,
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#ebebeb',
    fontSize: 28,
  }
});

export default connect(mapStateToProps)(FirstTabScreen);
