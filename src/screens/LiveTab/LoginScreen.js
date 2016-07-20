import _ from 'lodash';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
// import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import BarChart from '../GuestsTab/BarChart';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';

const LOGIN_SCREEN = 'loginScreen'
const QUESTIONS_SCREEN = 'questionsScreen'

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

  submitButtonClicked() {
    const password = 'host_pass' // Meanwhile. We don't care about it in this version.
    if (this.passwordTextField === password) {
      this.setState({screenState: QUESTIONS_SCREEN});
    }
    else {
      Alert.alert('Error', 'Wrong password');
    }
  }

  renderLoginScreen() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Please enter your password:</Text>
        <TextInput style={styles.input} secureTextEntry={true} onChange={(event) => this.passwordTextField = event.nativeEvent.text}/>
        <TouchableOpacity style={styles.submitButton} onPress={this.submitButtonClicked.bind(this)}><Text style={{color: 'white'}}>Login</Text></TouchableOpacity>
      </View>
    );
  }

  questionPressed(question) {
    if (question.active) {
      this.props.dispatch({type: actions.LIVE_QUESTION_INACTIVE, data: {question}});
    }
    else {
      this.props.dispatch({type: actions.LIVE_QUESTION_ACTIVATE, data: {question}});
    }
  }

  renderQuestion(question) {
    const questionJSX = question.active ? <View key={question.question} style={styles.selectedQuestion}><Text>{question.question}</Text></View>
    : <View key={question.question} style={styles.question}><Text>{question.question}</Text></View>

    return (
      <TouchableOpacity key={question.question} onPress={() => this.questionPressed(question)}>
        {questionJSX}
      </TouchableOpacity>
    )
  }

  renderQuestionsScreen() {
    return (
      <View style={styles.questionsContainer}>
        {_.map(this.props.questions, (question) => this.renderQuestion(question))}
      </View>
    );
  }

  render() {
    if (this.state.screenState == LOGIN_SCREEN) {
      return this.renderLoginScreen();
    }
    else if (this.state.screenState == QUESTIONS_SCREEN) {
      return this.renderQuestionsScreen();
    }

    return (
      <View></View>
    );
  }
}

const styles = StyleSheet.create({
  questionsContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#31a39c',
  },
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
  selectedQuestion: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 12,
    marginTop: 20,
    backgroundColor: 'green'
  },
  question: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 12,
    marginTop: 20,
  }
});

function mapStateToProps(state) {
  const questionsData = state.questions.questionsData
  return {
    questions: questionsData,
  };
}

export default connect(mapStateToProps)(LoginScreen);
