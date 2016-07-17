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
  }
  return state;
};
