import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

import StatusBar from './StatusBar';
import { SearchBox } from './SearchBox';

export default class HeaderCari extends Component {
  render() {
    return (
      <StatusBar>
        <Icon.ToolbarAndroid
          titleColor={colors.light}
          style={styles.toolbar}
          navIconName="arrow-back"
          onIconClicked={() => this.props.navigation.goBack()}
        >
          <SearchBox placeholder={this.props.placeholder} />
        </Icon.ToolbarAndroid>
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
