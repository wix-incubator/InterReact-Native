import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './firstTab/firstTabScreen';
import SecondTabScreen from './secondTab/secondTabScreen';
import ThirdTabScreen from './thirdTab/thirdTabScreen';

import {store} from '../store';
import {Provider} from 'react-redux';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen, store, Provider);
  Navigation.registerComponent('example.ThirdTabScreen', () => ThirdTabScreen, store, Provider);

}