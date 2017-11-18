import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight
} from 'react-native';
import firebase from 'react-native-firebase';
import { colors } from 'styles';

export default class DrawerContent extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null
    };
  }

  navigateTo = (routeName, scene) => {
    this.props.closeDrawer();
    if (routeName !== scene) {
      if (routeName === 'Beranda') {
        setTimeout(
          () =>
            this.props.navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName })]
              })
            ),
          0
        );
      } else {
        setTimeout(() => this.props.navigation.navigate(routeName), 0);
      }
    }
  };

  styleActiveMenu = screen => {
    if (screen === this.props.scene) {
      return styles.activeMenu;
    }
  };

  getMenus(menus, menusAuth) {
    return this.state.user ? menusAuth : menus;
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
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
            source={require('../assets/images/icanang-cover.png')}
            style={styles.backgroundCover}
          />
        </View>
        <View>
          {this.getMenus(menus, menusAuth).map((val, index) => {
            return (
              <TouchableNativeFeedback
                key={index}
                onPress={() => this.navigateTo(val.screen, this.props.scene)}
                background={TouchableNativeFeedback.Ripple('#dddddd')}
              >
                <View style={styles.touchableView}>
                  <Text
                    style={[styles.menuText, this.styleActiveMenu(val.screen)]}
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
