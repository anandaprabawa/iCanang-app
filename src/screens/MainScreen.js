import React from 'react';
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

const Drawer = DrawerNavigator(navigations, {
  initialRouteName: 'Beranda',
  contentComponent: props => <DrawerComponent {...props} />,
  contentOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.dark
  }
});

export default Drawer;
