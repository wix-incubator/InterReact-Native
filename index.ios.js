import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import firebaseService from './src/services/firebase';
import {store} from './src/store';
import * as actions from './src/store/constants/actions';

// connecting fitrebae
const confId = '4255ec05-da65-b654-8c2d-bb7f71221c32';
firebaseService.connect(confId);

firebaseService.listenToConfChanges(data => {
  if (data) {
    store.dispatch({type: actions.UPDATE_STATE, data});
  }
});

firebaseService.readConf().then(data => {
  console.warn(data.attendees)
  store.dispatch({type: actions.UPDATE_STATE, data});

  registerScreens(); // this is where you register all of your app's screens

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
});