import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';
import { colors, androidStatusBarColor } from 'styles';

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => this.navigateTo('MainScreen'), 1000);
  }

  navigateTo = routeName => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <StatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
          translucent={true}
        />
        <Image
          source={require('images/icanang-splash-screen.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  image: {
    width: Dimensions.get('window').width * 0.5
  }
});
