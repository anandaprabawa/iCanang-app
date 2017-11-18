import { StackNavigator } from 'react-navigation';
import SplashScreen from 'screens/SplashScreen';
import MainScreen from 'screens/MainScreen';

export default StackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    MainScreen: { screen: MainScreen }
  },
  {
    headerMode: 'none'
  }
);
