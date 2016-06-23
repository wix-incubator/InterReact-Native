import * as types from '../constants/actions';

export const incrementVisitorCount = () => ({
  type: types.INCREMENT_VISITOR_COUNT,
  payload: {
    promise: fetch('http://localhost:3000/visitors', {method: 'POST'})
      .then(res => res.json())
  }
});