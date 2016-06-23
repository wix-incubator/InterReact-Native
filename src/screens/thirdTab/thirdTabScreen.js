import _ from 'lodash';
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

class ThirdTabScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1)
    }
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
    const answerRef = 'answer'+i;
    //console.error(this.refs.answer1)
    this.refs.container.zoomOut(500);

  }

  renderAnswer(answer, i) {
    const answerRef = 'answer'+i;
    return (
        <TouchableOpacity key={i} style={styles.answer} onPress={() => this.answerPressed(i)}>

            <Text style={styles.text}>
              {answer}
            </Text>
        </TouchableOpacity>
    )
  }

  render() {
    const questionToShow = this.getQuestionToShow();
    return (
      <Animatable.View style={styles.container} ref='container'>
        {this.renderQuestion(questionToShow)}
        {questionToShow.answers.map((answer, i) => this.renderAnswer(answer, i))}
      </Animatable.View>
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
    marginTop: 1,

  },
  text: {
    alignSelf: 'center',
    fontSize: 25
  }
});

export default connect(mapStateToProps)(ThirdTabScreen);