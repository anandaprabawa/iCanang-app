import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import DrawerContent from 'components/DrawerContent';

// screens
import Beranda from './Beranda';
import Cari from './Cari';
import Daftar from './Daftar';
import Masuk from './Masuk';
import PenjualTerdekat from './PenjualTerdekat';
import Produk from './Produk';
import Keluar from './Keluar';
import PenjualTab from './Cari/PenjualTab';

const BerandaStack = StackNavigator({
  Beranda: { screen: Beranda },
  Cari: { screen: Cari },
  PenjualTerdekat: { screen: PenjualTerdekat }
});

export default DrawerNavigator(
  {
    Beranda: { screen: BerandaStack },
    Daftar: { screen: Daftar },
    Masuk: { screen: Masuk },
    Produk: { screen: Produk },
    Keluar: { screen: Keluar }
  },
  {
    initialRouteName: 'Beranda',
    contentComponent: props => <DrawerContent {...props} />
  }
);
