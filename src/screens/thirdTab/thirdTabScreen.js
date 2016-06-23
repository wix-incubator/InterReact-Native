import _ from 'lodash';
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  AlertIOS
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import BarChart from '../secondTab/BarChart';

const EMPTY_SCREEN = 'emptyScreen';
const QUESTION_SCREEN = 'questionScreen';
const RESULTS_SCREEN = 'resultsScreen';
import * as Constants from '../Constants'

class ThirdTabScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: '', // for a textual button, provide the button title (label)
        id: 'do', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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
      if (event.id == 'do') {
        this.setState({screenState: QUESTION_SCREEN});
      }
    }
  }

  renderEmptyState() {
    return (
      <Animatable.View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]} ref='container'>
        <Text style={{fontSize:42, color: '#ebebeb', textAlign: 'center', padding: 20}}>ARE YOU READY?!</Text>
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
    //console.error(this.refs.answer1)
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
    return (
      <Animatable.View style={[styles.container, {padding: 12}]} ref='questions' >
        {this.renderQuestion(this.getQuestionToShow())}
        {this.getQuestionToShow().answers.map((answer, i) => this.renderAnswer(answer, i))}
      </Animatable.View>
    )
  }

  renderResultsScreen() {
    return (
      <Animatable.View style={[styles.container, {padding: 20}]} ref='results' >
        <BarChart groupFn={() => {
          const grouped = _.groupBy(this.getQuestionToShow().results);
          const result = {};
          Object.keys(grouped).map(i => result[this.getAnswer(i)] = grouped[i]);
          return result
         }
        } />
      </Animatable.View>
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
    backgroundColor: '#52489C',
  },
  question: {
    padding: 10,
    paddingBottom: 30,
  },
  questionText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#ebebeb',
    marginLeft: 5,
    marginTop: 2,
  },
  answer: {
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#bebebe',
    borderRadius: 1,
  },
  answerText: {
    fontSize: 22,
    color: '#ebebeb'
  }

});

export default connect(mapStateToProps)(ThirdTabScreen);