import {combineReducers} from 'redux';
import * as actions from '../constants/actions';
import {details} from './details';
import {attendees} from './attendees';
import {questions} from './questions';
import {agenda} from './agenda';
import {archive} from './archive';

import reduceReducers from 'reduce-reducers';

export default reduceReducers(
  combineReducers({
    agenda,
    archive,
    details,
    attendees,
    questions,
  }),
  (state, action) => {
    switch (action.type) {
      case actions.UPDATE_STATE:
        return action.data;
    }
    return state;
  }
)
