import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers'
import firebaseMiddleware from './firebaseMiddleware';
import promiseMiddleware from 'redux-promise-middleware';

const middlewares = [
  // createLogger(),
  firebaseMiddleware,
  promiseMiddleware()
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export const store = createStoreWithMiddleware(reducers);

export const mapStateToProps = state => state;
