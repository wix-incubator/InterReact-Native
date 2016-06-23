import {combineReducers} from 'redux';
import * as actions from '../constants/actions';
import {details} from './details';
import {attendees} from './attendees';


export default combineReducers({
  details,
  attendees
});