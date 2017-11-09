import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { Text } from 'native-base';

export default class Keluar extends Component {
  componentWillMount() {
    firebase.auth().signOut(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Beranda' })]
      });
      this.props.navigation.dispatch(resetAction);
    });
  }

  render() {
    return <Text>Keluar</Text>;
  }
}
