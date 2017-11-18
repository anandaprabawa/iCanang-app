import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { View, Text, ActivityIndicator } from 'react-native';
import styles, { spinnerColor } from './styles';

export default class Keluar extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Beranda' })]
        });
        this.props.navigation.dispatch(resetAction);
      });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Keluar</Text>
        <ActivityIndicator size="large" color={spinnerColor} />
      </View>
    );
  }
}
