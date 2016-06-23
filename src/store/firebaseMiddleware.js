import firebase from '../services/firebase';
import * as actions from '../store/constants/actions';

export default firebaseMiddleware = ({getState}) => next => action => {
  if (action.type === actions.UPDATE_STATE) {
    //change state to action.data
  } else {
    const result = next(action);
    firebase.updateConf(getState());
    return result;
  }
};
