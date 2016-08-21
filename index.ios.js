import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';
import firebaseService from './src/services/firebase';
import {store} from './src/store';
import * as actions from './src/store/constants/actions';

// connecting fitrebae
const confId = '47e054e4-e5be-c2fe-7c58-b3753c7bd039';
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
        icon: require('./src/images/iOS/details.png'),
        selectedIcon: require('./src/images/iOS/details_selected.png'),
      },
      {
        label: 'Agenda',
        screen: 'example.AgendaScreen',
        title: 'Agenda',
        icon: require('./src/images/iOS/agenda.png'),
        selectedIcon: require('./src/images/iOS/agenda_selected.png'),
      },
      {
        label: 'Guests',
        screen: 'example.SecondTabScreen', // this is a registered name for a screen
        title: 'Guests',
        icon: require('./src/images/iOS/guests.png'),
        selectedIcon: require('./src/images/iOS/guests_selected.png'),
      },
      {
        label: 'Archive',
        screen: 'example.ArchiveScreen',
        title: 'Archive',
        icon: require('./src/images/iOS/archive.png'),
        selectedIcon: require('./src/images/iOS/archive_selected.png'),
      },
      {
        label: 'Live',
        screen: 'example.ThirdTabScreen', // this is a registered name for a screen
        title: 'Live',
        icon: require('./src/images/iOS/live.png'),
        selectedIcon: require('./src/images/iOS/live_selected.png'),
      },
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: '#165574',
      tabBarBackgroundColor: '#EBEBEB'
    },

  })
});
