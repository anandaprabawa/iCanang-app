import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image
} from 'react-native';
import { colors } from 'styles';

export default class DrawerContent extends Component {
  constructor() {
    super();
    this.subscriber = null;
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.subscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
    });
  }

  componentWillUnmount() {
    if (this.subscriber) {
      this.subscriber();
    }
  }

  getMenus(menus, menusAuth) {
    return this.state.user ? menusAuth : menus;
  }

  navigateTo(screenName) {
    this.props.navigation.navigate(screenName);
  }

  activeMenuStyle(screenName) {
    if (this.props.activeItemKey === screenName) {
      return styles.activeMenu;
    }
  }

  render() {
    const menus = [
      { screen: 'Beranda', label: 'Beranda' },
      { screen: 'Daftar', label: 'Daftar' },
      { screen: 'Masuk', label: 'Masuk' }
    ];

    const menusAuth = [
      { screen: 'Beranda', label: 'Beranda' },
      { screen: 'Produk', label: 'Produk' },
      { screen: 'Keluar', label: 'Keluar' }
    ];

    return (
      <View style={styles.viewContainer}>
        <View>
          <Image
            source={require('images/icanang-cover.png')}
            style={styles.backgroundCover}
          />
        </View>
        <View>
          {this.getMenus(menus, menusAuth).map((val, index) => {
            return (
              <TouchableNativeFeedback
                key={index}
                onPress={() => this.navigateTo(val.screen)}
                background={TouchableNativeFeedback.Ripple('#dddddd')}
              >
                <View style={styles.touchableView}>
                  <Text
                    style={[styles.menuText, this.activeMenuStyle(val.screen)]}
                  >
                    {val.label}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
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
    height: 150
  },
  menuText: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    color: colors.dark,
    fontFamily: 'Roboto_medium'
  },
  activeMenu: {
    backgroundColor: '#ededed',
    color: colors.primary
  },
  touchableView: {
    backgroundColor: '#ffffff'
  }
});
