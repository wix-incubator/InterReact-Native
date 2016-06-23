import * as actions from '../constants/actions';
const defaultState = {
  state: 'nothing'
};
export const firebase = (state = defaultState, action) => {
  if (action.type = actions.UPDATE_STATE) {
    return action.data || defaultState;
  }
  return state;
};