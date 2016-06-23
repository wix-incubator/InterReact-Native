const attendeesData = [
  {
    name: 'Aaron Greenwald',
    org: 'Wix'
  },
  {
    name: 'Ethan Sharabi',
    org: 'Wix'
  },
  {
    name: 'Ran Greenbaerg',
    org: 'Wix'
  },
  {
    name: 'Dan Abramov',
    org: 'Facebook'
  },


  //'', 'Ran Greenbaerg', 'Dan Abramov'
];

const defaultState = {
  attendeesData
};

export const attendees = (state = defaultState, action) => {
  return state;
};