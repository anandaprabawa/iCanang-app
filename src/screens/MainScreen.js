import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { DrawerNavigator } from 'react-navigation';
import { colors } from 'styles';
import { Icon } from 'native-base';

// screens for drawer
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

export default DrawerNavigator(navigations, {
  initialRouteName: 'Beranda',
  contentComponent: props => <DrawerComponent {...props} />,
  contentOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.dark
  }
});
