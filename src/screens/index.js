import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { colors } from '../styles/variables';
import { Icon } from 'native-base';

// screens
import Beranda from './beranda';
import Masuk from './masuk/';
import Daftar from './daftar';

// components
import DrawerComponent from '../components/drawer';

const Drawer = DrawerNavigator(
  {
    Beranda: { screen: Beranda },
    Daftar: { screen: Daftar },
    Masuk: { screen: Masuk }
  },
  {
    initialRouteName: 'Beranda',
    contentComponent: props => <DrawerComponent {...props} />,
    contentOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.dark
    }
  }
);

export default Drawer;
