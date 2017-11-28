import React, { Component } from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

export default class StatusBarComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.20)"
          barStyle="light-content"
        />

        {Platform.OS === 'android' && Platform.Version >= 20 ? (
          <View
            style={{
              height: 20,
              backgroundColor: colors.primary
            }}
          />
        ) : null}

        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    backgroundColor: colors.primary
  }
});
