import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './firstTab/firstTabScreen';
import SecondTabScreen from './secondTab/secondTabScreen';
import ThirdTabScreen from './thirdTab/thirdTabScreen';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('example.ThirdTabScreen', () => ThirdTabScreen);

}