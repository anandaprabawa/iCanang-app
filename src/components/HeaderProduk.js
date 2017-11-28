import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

import StatusBar from './StatusBar';

export default class Header extends Component {
  render() {
    return (
      <StatusBar>
        <Icon.ToolbarAndroid
          title={this.props.title}
          titleColor={colors.light}
          style={styles.toolbar}
          navIconName="menu"
          onIconClicked={() => this.props.openDrawer()}
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
