import {combineReducers} from 'redux';
import * as actions from '../constants/actions';
import {details} from './details';
import {attendees} from './attendees';
import {questions} from './questions';

import reduceReducers from 'reduce-reducers';

export default reduceReducers(
  combineReducers({
    details,
    attendees,
    questions
  }),
  (state, action) => {
    console.log('here', action)
    switch (action.type) {
      case actions.UPDATE_STATE:
        return action.data;
    }
    return state;
  }
)
