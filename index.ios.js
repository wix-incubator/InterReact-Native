import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Details',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      title: 'Screen One'
    },
    {
      label: 'Attendees',
      screen: 'example.SecondTabScreen', // this is a registered name for a screen
      title: 'Screen Two'
    },
    {
      label: 'Third',
      screen: 'example.ThirdTabScreen', // this is a registered name for a screen
      title: 'Screen Three'
    }
  ]
});