import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import SplashScreen from 'screens/SplashScreen';
import MainScreen from 'screens/MainScreen';
import { Animated } from 'react-native-maps';

export default StackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    MainScreen: { screen: MainScreen }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
