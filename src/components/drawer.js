import React, { Component } from 'react';
import { DrawerItems } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { View } from 'native-base';

export default class DrawerContentComponent extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <View>
          <Image
            source={require('../assets/images/icanang-cover.png')}
            style={styles.backgroundCover}
          />
        </View>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  backgroundCover: {
    width: '100%',
    height: 130
  }
});
