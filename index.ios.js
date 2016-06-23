import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import firebaseService from './src/services/firebase';

registerScreens(); // this is where you register all of your app's screens

// connecting fitrebae
const confId = '4255ec05-da65-b654-8c2d-bb7f71221c32';
firebaseService.connect(confId);

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Details',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      title: 'Details'
    },
    {
      label: 'Attendees',
      screen: 'example.SecondTabScreen', // this is a registered name for a screen
      title: 'Attendees'
    },
    {
      label: 'Live',
      screen: 'example.ThirdTabScreen', // this is a registered name for a screen
      title: 'Live'
    }
  ]
});