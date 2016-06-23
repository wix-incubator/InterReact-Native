const questionsData = [
  {
    question: "What's your programming level?",
    answers:[
      'beginner',
      'mid',
      'advanced',
      'pro'
    ]
  },
  {
    question: "What's your programming level?",
    answers:[
      'beginner',
      'mid',
      'advanced',
      'pro'
    ],
    correctAnswerIndex: 2
  },


  //'', 'Ran Greenbaerg', 'Dan Abramov'
];

const defaultState = {
  questionsData
};

export const questions = (state = defaultState, action) => {
  return state;
};