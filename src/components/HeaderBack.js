import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

import StatusBar from './StatusBar';

export default class HeaderBack extends Component {
  render() {
    return (
      <StatusBar>
        <Icon.ToolbarAndroid
          title={this.props.title}
          titleColor={colors.light}
          style={styles.toolbar}
          navIconName="arrow-back"
          onIconClicked={() => this.props.navigation.goBack()}
        />
      </StatusBar>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: colors.primary
  }
});
