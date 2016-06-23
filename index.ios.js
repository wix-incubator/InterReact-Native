import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import firebaeService from './src/services/firebase';

registerScreens(); // this is where you register all of your app's screens

// connecting fitrebae
const confId = '4255ec05-da65-b654-8c2d-bb7f71221c31';
firebaeService.connect(confId);

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