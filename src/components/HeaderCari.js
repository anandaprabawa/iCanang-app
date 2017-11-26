import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  TextInput,
  View,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

export default class HeaderBack extends Component {
  render() {
    return (
      <Icon.ToolbarAndroid
        titleColor={colors.light}
        style={styles.toolbar}
        navIconName="arrow-back"
        onIconClicked={() => this.props.navigation.goBack()}
      >
        <StatusBar
          backgroundColor={colors.statusBar}
          barStyle="light-content"
        />
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <Icon name="search" size={24} style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Cari produk atau penjual"
              placeholderTextColor={colors.dark}
              underlineColorAndroid="transparent"
              returnKeyType="search"
              onChangeText={this.props.onSearchText}
              onSubmitEditing={this.props.onSubmitSearch}
            />
          </View>
        </View>
      </Icon.ToolbarAndroid>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: colors.primary
  },
  searchContainer: {
    display: 'flex',
    flex: 1,
    width: Dimensions.get('window').width - 75,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    backgroundColor: colors.primary
  },
  searchView: {
    backgroundColor: colors.light,
    borderRadius: 3,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  icon: {
    color: colors.dark
  },
  textInput: {
    flex: 1
  }
});
