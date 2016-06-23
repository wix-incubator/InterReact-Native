import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';
import firebaseService from './src/services/firebase';
import {store} from './src/store';
import * as actions from './src/store/constants/actions';

// connecting fitrebae
const confId = 'guid';
firebaseService.connect(confId);

firebaseService.listenToConfChanges(data => {
  if (data) {
    store.dispatch({type: actions.UPDATE_STATE, data});
  }
});

firebaseService.readConf().then(data => {
  store.dispatch({type: actions.UPDATE_STATE, data});

  registerScreens(); // this is where you register all of your app's screens

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Details',
        screen: 'example.FirstTabScreen', // this is a registered name for a screen
        title: 'Details',
        icon: require('./src/images/details.png'),
      },
      {
        label: 'Guests',
        screen: 'example.SecondTabScreen', // this is a registered name for a screen
        title: 'Guests',
        icon: require('./src/images/guests.png'),
      },
      {
        label: 'Live',
        screen: 'example.ThirdTabScreen', // this is a registered name for a screen
        title: 'Live',
        icon: require('./src/images/live.png'),
      },
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: 'green'
    },
    navigatorStyle: {
      navBarBackgroundColor: 'red'
    }
  })
});