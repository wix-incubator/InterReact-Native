import {combineReducers} from 'redux';
import * as actions from '../constants/actions';
import {details} from './details';
import {attendees} from './attendees';
import reduceReducers from 'reduce-reducers';

export default reduceReducers(
  combineReducers({
    details,
    attendees
  }),
  (state, action) => {
    switch (action.type) {
      case actions.UPDATE_STATE:
        return action.data;
    }
    return state;
  }
)