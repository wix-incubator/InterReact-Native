import * as actions from '../constants/actions';
const attendeesData = [];

const defaultState = {
  attendeesData
};

export const attendees = (state = defaultState, action) => {
  switch (action.type) {
    case actions.ATTENDEES_SEND_RSVP:
      const newAttendeesData = [...state.attendeesData, action.data];
      return {...state, attendeesData: newAttendeesData};
  }
  return state;
};