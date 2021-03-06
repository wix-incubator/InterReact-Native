import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './DetailsTab/firstTabScreen';
import RSVPScreen from './DetailsTab/rsvpScreen';
import SecondTabScreen from './GuestsTab/secondTabScreen';
import ThirdTabScreen from './LiveTab/thirdTabScreen';
import LoginScreen from './LiveTab/LoginScreen';
import AgendaScreen from './AgendaTab/AgendaScreen';
import ArchiveScreen from './ArchiveTab/ArchiveScreen';
import EventMaterialsScreen from './ArchiveTab/EventMaterialsScreen';
import Example from '../demo/index';


import {store} from '../store';
import {Provider} from 'react-redux';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('details.RSVPScreen', () => RSVPScreen, store, Provider);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen, store, Provider);
  Navigation.registerComponent('live.loginScreen', () => LoginScreen, store, Provider)
  Navigation.registerComponent('example.ThirdTabScreen', () => ThirdTabScreen, store, Provider);
  Navigation.registerComponent('example.AgendaScreen', () => AgendaScreen, store, Provider);
  Navigation.registerComponent('example.DemoScreen', () => Example, store, Provider);
  Navigation.registerComponent('example.ArchiveScreen', () => ArchiveScreen, store, Provider);
  Navigation.registerComponent('example.EventMaterialsScreen', () => EventMaterialsScreen, store, Provider)

}
