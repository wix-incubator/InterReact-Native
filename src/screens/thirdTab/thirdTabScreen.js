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

const EMPTY_SCREEN = 'emptyScreen';
const QUESTION_SCREEN = 'questionScreen';
const RESULTS_SCREEN = 'resultsScreen';

class ThirdTabScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'DO', // for a textual button, provide the button title (label)
        id: 'do', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
    ]
  };
  static navigatorStyle = {
    navBarBackgroundColor: 'red'
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
      <Animatable.View style={styles.container} ref='container'>
        <Text style={{fontSize:30}}>Are Your Ready ?!</Text>
      </Animatable.View>
    )
  }

  renderQuestion(question) {
    return (
      <View style={styles.question}>
        <Text style={styles.text}>
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

  renderAnswer(answer, i) {
    const answerRef = 'answer' + i;
    return (
      <TouchableOpacity key={i} style={styles.answer} onPress={() => this.answerPressed(i)}>
        <Text style={styles.text}>
          {answer}
        </Text>
      </TouchableOpacity>
    )
  }
  renderQuestionScreen() {
    return (
      <Animatable.View style={styles.container} ref='questions' >
        {this.renderQuestion(this.getQuestionToShow())}
        {this.getQuestionToShow().answers.map((answer, i) => this.renderAnswer(answer, i))}
      </Animatable.View>
    )
  }

  renderResultsScreen() {
    return (
      <Animatable.View style={styles.container} ref='results' >
        <Text style={styles.text}>
         kkkk
        </Text>
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
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',

  },
  question: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#CAD2C5',
    padding: 20,

  },
  answer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#59C3C3',
    marginTop: 1,

  },
  text: {
    alignSelf: 'center',
    fontSize: 25
  }
});

export default connect(mapStateToProps)(ThirdTabScreen);