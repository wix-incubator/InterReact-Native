import * as actions from '../constants/actions';

export const details = (state = 0, action) => {
  if (action.type === `${actions.INCREMENT_VISITOR_COUNT}_FULFILLED`) {
    return action.payload.count;
  }
  return state;
};
