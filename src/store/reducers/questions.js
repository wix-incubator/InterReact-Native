import _ from 'lodash'
import * as actions from '../constants/actions';

const defaultState = {
  "questionsData" : [ {
    "active" : true,
    "answers" : [ "beginner", "mid", "advanced", "pro" ],
    "question" : "What's your programming level?",
    "results" : [ 0, 0, 1, 1, 1, 1, 1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2 ]
  }, {
    "active" : false,
    "answers" : [ "NavigatorIOS", "NavigatorExperimental", "React Native Navigation", "Other/None" ],
    "correctAnswerIndex" : 3,
    "question" : "What do you use to navifffgate in RN?",
    "results" : [ 0, 0, 1, 1, 1, 1, 1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2 ]
  } ]
};

export const questions = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LIVE_RESULT_SUBMITTED:

      const oldResults = _.get(action, 'data.question.results') ? _.get(action, 'data.question.results') : []
      const newResultData = oldResults.concat(action.data.index);
      const questionIndex = _.indexOf(state.questionsData, action.data.question);
      const newState = _.clone(state)

      _.set(newState, `questionsData[${questionIndex}].results`, newResultData);

      return newState

    case actions.LIVE_QUESTION_ACTIVATE:
      const newQuestion = action.data.question;

      // Activate the question
      _.set(newQuestion, 'active', true);

      // Get the array from the state
      let questionsData = _.get(state, 'questionsData');
      // Remove the question that is the same as the question we want to activate
      _.remove(questionsData, (question) => question.question == action.data.question.question);

      // Set all the questions as inactive
      _.map(questionsData, (question) => _.set(question, 'active', false));

      // Add the activeted question to the array
      questionsData.push(newQuestion);

      // Set the new array in the state
      _.set(state, 'questionsData', questionsData);
      return state;

    case actions.LIVE_QUESTION_INACTIVE:
      // Set all the questions as inactive
      let questionsArray = _.get(state, 'questionsData');
      _.map(questionsArray, (question) => _.set(question, 'active', false));
      _.set(state, 'questionsData', questionsArray);
      return state;

  }
  return state;
};
