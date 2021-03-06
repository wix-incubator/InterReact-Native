import _ from 'lodash';
import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  Alert,
  Text,
  Image,
  View,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import BarChart from '../GuestsTab/BarChart';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';

const EMPTY_SCREEN = 'emptyScreen';
const QUESTION_SCREEN = 'questionScreen';
const RESULTS_SCREEN = 'resultsScreen';
import * as Constants from '../Constants'

class ThirdTabScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Host login', // for a textual button, provide the button title (label)
        id: 'host', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        disableIconTint: true
        }
      ]
  };
  static navigatorStyle = {
    navBarBackgroundColor: Constants.navBarBackgroundColor,
    navBarTextColor: Constants.navBarTextColor
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      fadeAnim: new Animated.Value(1),
      screenState: EMPTY_SCREEN
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'host') {
        if (Platform.OS != 'ios') {
          Alert.alert('You cannot perform this operation...');
          return;
        }
        Navigation.showModal({
          screen: 'live.loginScreen',
          title: 'Login',
          navigatorStyle: {},
          navigatorButtons: {
            leftButtons: [{
              title: 'Cancel',
              id: 'cancel'
            }]
          }
        });
      }
    }
  }

  startLiveButtonClicked() {
    this.setState({screenState: QUESTION_SCREEN});
  }

  renderEmptyState() {
    return (
      <Animatable.View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]} ref='container'>
        <Text style={{fontSize:28, color: '#ebebeb', textAlign: 'center', padding: 20}}>ARE YOU READY?!</Text>
        <TouchableOpacity style={styles.startButton }onPress={this.startLiveButtonClicked.bind(this)}>
          <Text style={styles.startButtonText}>Join Live</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
  }

  renderQuestion(question) {
    return (
      <View style={styles.question}>
        <Text style={styles.questionText}>
          {question.question}
        </Text>
      </View>
    )
  }

  getQuestionToShow() {
    const questionsData = this.props.questions.questionsData;
    const questionToShow = _.find(questionsData, 'active');
    return questionToShow;
  }

  answerPressed(i) {
    const answerRef = 'answer' + i;
    this.props.dispatch({type: actions.LIVE_RESULT_SUBMITTED, data: {question: this.getQuestionToShow(), index: i}});
    this.setState({screenState: RESULTS_SCREEN});

  }

  getAnswer(i) {
    return this.getQuestionToShow().answers[i];
  }

  renderAnswer(answer, i) {
    const answerRef = 'answer' + i;
    return (
      <TouchableOpacity key={i} style={styles.answer} onPress={() => this.answerPressed(i)}>
        <Text style={styles.answerText}>
          {answer}
        </Text>
      </TouchableOpacity>
    )
  }
  renderQuestionScreen() {
    if (!this.getQuestionToShow()) {
      return (
        <View style={styles.container, {backgroundColor: '#4ca0c0', justifyContent: 'center', flex: 1}}>
          <View style={styles.question, {margin: 60}}>
            <Text style={styles.questionText, {textAlign: 'center', fontSize: 28, color: 'white'}}>
              There is no an active question right now...
            </Text>
            <Text style={{color: '#ffffff', paddingTop: 30, textAlign: 'center'}}>When the host active a question, you will be the first one to see it here.</Text>
          </View>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <Animatable.View style={[styles.container, {padding: 12}]} ref='questions' >
          {this.renderQuestion(this.getQuestionToShow())}
          {this.getQuestionToShow().answers.map((answer, i) => this.renderAnswer(answer, i))}
        </Animatable.View>
      </ScrollView>
    )
  }

  renderResultsScreen() {
    if (!this.getQuestionToShow()) {
      // TODO: To fix the warning - use componentDidMound and setState if the state is RESULT_SCREEN and there is now question to show
      this.setState({screenState: QUESTION_SCREEN})
      return (<View></View>);
    }
    return (
      <ScrollView style={styles.container}>
        <Animatable.View style={[styles.container, {padding: 20}]} ref='results' >
          <BarChart groupFn={() => {
            const grouped = _.groupBy(this.getQuestionToShow().results);
            const result = {};
            Object.keys(grouped).map(i => result[this.getAnswer(i)] = grouped[i]);
            return result
           }
          } />
        </Animatable.View>
      </ScrollView>
    )
  }

  render() {
    if (this.state.screenState === EMPTY_SCREEN) {
      return (
        this.renderEmptyState()
      )
    }
    if (this.state.screenState === QUESTION_SCREEN) {
      return (
        this.renderQuestionScreen()
      )
    }
    if (this.state.screenState === RESULTS_SCREEN) {
      return (
        this.renderResultsScreen()
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#165574',
  },
  question: {
    padding: 10,
    paddingBottom: 30,
  },
  questionText: {
    fontSize: 28,
    color: '#ebebeb',
    marginLeft: 5,
    marginTop: 2,
  },
  answer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
    borderWidth: 2,
    borderColor: '#bebebe',
    borderRadius: 5,
  },
  answerText: {
    fontSize: 22,
    color: '#ebebeb',
    textAlign: 'center',
  },
  startButton: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 12,
    paddingLeft: 120,
    paddingRight: 120,
    borderRadius: 5,
  },
  startButtonText: {
    textAlign: 'center',
    color: '#ebebeb',
    fontSize: 28,
    fontWeight: '600'
  }

});

export default connect(mapStateToProps)(ThirdTabScreen);
