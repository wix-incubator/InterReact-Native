const questionsData = [
  {
    question: "What's your programming level?",
    answers:[
      'beginner',
      'mid',
      'advanced',
      'pro'
    ],
    //active: 'true'
  },
  {
    question: "How is RN ListView?",
    answers:[
      'great',
      'not-bad',
      'bad',
      'super-bad'
    ],
    correctAnswerIndex: 3,
    active: 'true'
  },

];

const defaultState = {
  questionsData
};

export const questions = (state = defaultState, action) => {
  return state;
};