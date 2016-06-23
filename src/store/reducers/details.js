import * as actions from '../constants/actions';

const defaultState = {
  title: 'React Native Hackathon',
  description: 'Come hack!!!!!!!!!!',
  city: 'Tel Aviv',
  date: 'June 23'
};

export const details = (state = defaultState, action) => {
  if (action.type === `${actions.INCREMENT_VISITOR_COUNT}_FULFILLED`) {
    return action.payload.count;
  }
  return state;
};
