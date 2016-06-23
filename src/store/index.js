import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers'
import promiseMiddleware from 'redux-promise-middleware';

const middlewares = [
  createLogger(),
  promiseMiddleware()
];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export const store = createStoreWithMiddleware(reducers);

export const mapStateToProps = state => ({

});
