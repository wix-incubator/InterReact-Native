import {combineReducers} from 'redux';
import * as actions from '../constants/actions';

const visitorCount = (state = 0, action) => {
  if (action.type === `${actions.INCREMENT_VISITOR_COUNT}_FULFILLED`) {
    return action.payload.count;
  }
  return state;
};

export default combineReducers({visitorCount});