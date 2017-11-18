import React, { Component } from 'react';
import { StyleSheet, StatusBar, DrawerLayoutAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

export default class Header extends Component {
  onActionSelected = position => {
    if (position === 0) {
      this.props.navigation.navigate('Cari');
    }
  };

  render() {
    return (
      <Icon.ToolbarAndroid
        title={this.props.title}
        titleColor={colors.light}
        style={styles.toolbar}
        navIconName="menu"
        onIconClicked={() => this.props.openDrawer()}
        actions={[
          {
            title: 'Cari',
            iconName: 'search',
            show: 'always'
          }
        ]}
        onActionSelected={this.onActionSelected}
      >
        <StatusBar
          backgroundColor={colors.statusBar}
          barStyle="light-content"
        />
      </Icon.ToolbarAndroid>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: colors.primary,
    elevation: 3
  }
});
