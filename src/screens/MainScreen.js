import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { DrawerNavigator } from 'react-navigation';
import { colors } from 'styles';
import { Icon } from 'native-base';

// screens
import Beranda from './Beranda';
import Masuk from './Masuk/';
import Daftar from './Daftar';
import Produk from './Produk';
import Keluar from './Keluar';

// components
import DrawerComponent from 'components/Drawer';

const navigations = {
  Beranda: { screen: Beranda },
  Daftar: { screen: Daftar },
  Masuk: { screen: Masuk }
};

const navigationsAuth = {
  Beranda: { screen: Beranda },
  ProdukSaya: { screen: Produk },
  Keluar: { screen: Keluar }
};

const Drawer = DrawerNavigator(navigations, {
  initialRouteName: 'Beranda',
  contentComponent: props => <DrawerComponent {...props} />,
  contentOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.dark
  }
});

export default class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  getNavigation() {
    const navigations = {
      Beranda: { screen: Beranda },
      Daftar: { screen: Daftar },
      Masuk: { screen: Masuk }
    };

    const navigationsAuth = {
      Beranda: { screen: Beranda },
      ProdukSaya: { screen: Produk },
      Keluar: { screen: Keluar }
    };

    return this.state.user ? navigationsAuth : navigations;
  }

  render() {
    const Drawer = DrawerNavigator(this.getNavigation(), {
      initialRouteName: 'Beranda',
      contentComponent: props => <DrawerComponent {...props} />,
      contentOptions: {
        activeTintColor: colors.primary,
        inactiveTintColor: colors.dark
      }
    });

    return <Drawer />;
  }
}
