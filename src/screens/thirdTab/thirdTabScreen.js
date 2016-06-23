import _ from 'lodash';
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';

class ThirdTabScreen extends Component {
  
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
    if (this.getQuestionToShow().correctAnswerIndex === i) {
      console.log('iiiiiiii', 'good');
    }
    else {
      console.log('iiiiiiii', 'bad');
    }

  }

  renderAnswer(answer, i) {
    return (
      <View key={i} style={styles.answer}>
        <TouchableOpacity style={styles.answer} onPress={() => this.answerPressed(i)}>
          <Text style={styles.text}>
            {answer}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const questionToShow = this.getQuestionToShow();
    return (
      <View style={styles.container}>
        {this.renderQuestion(questionToShow)}
        {questionToShow.answers.map((answer, i) => this.renderAnswer(answer, i))}
      </View>
    );
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
    marginTop: 1
  },
  text: {
    alignSelf: 'center',
    fontSize: 25
  }
});

export default connect(mapStateToProps)(ThirdTabScreen);