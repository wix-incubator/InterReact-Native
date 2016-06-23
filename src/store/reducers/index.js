import {combineReducers} from 'redux';
import * as actions from '../constants/actions';
import {details} from './details';
import {attendees} from './attendees';
import {questions} from './questions';


export default combineReducers({
  details,
  attendees,
  questions
});