import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { colors } from '../styles/variables';
import { Icon } from 'native-base';

// screens
import Beranda from './beranda';
import Masuk from './masuk/';
import Daftar from './daftar';
import Produk from './produk';
import Keluar from './keluar';

// components
import DrawerComponent from '../components/drawer';

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

const Drawer = DrawerNavigator(navigationsAuth, {
  initialRouteName: 'Beranda',
  contentComponent: props => <DrawerComponent {...props} />,
  contentOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.dark
  }
});

export default Drawer;
