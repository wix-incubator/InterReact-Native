import firebase from '../services/firebase';
import * as actions from '../store/constants/actions';

export default firebaseMiddleware = ({getState}) => next => action => {
  const result = next(action);
  if (action.type !== actions.UPDATE_STATE) {
    firebase.updateConf(getState());
  }
  return result;
};
