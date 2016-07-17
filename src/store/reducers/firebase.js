import * as actions from '../constants/actions';
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
  state: 'nothing'

});

export const firebase = (state = defaultState, action) => {
  if (action.type = actions.UPDATE_STATE) {
    return action.data || defaultState;
  }
  return state;
};
