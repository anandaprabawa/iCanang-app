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
import TambahProduk from './TambahProduk';

const MainScreen = StackNavigator({
  Beranda: { screen: Beranda },
  Cari: { screen: Cari },
  PenjualTerdekat: { screen: PenjualTerdekat }
});

const ProdukStack = StackNavigator({
  Produk: { screen: Produk },
  TambahProduk: { screen: TambahProduk }
});

export default DrawerNavigator(
  {
    Beranda: { screen: MainScreen },
    Daftar: { screen: Daftar },
    Masuk: { screen: Masuk },
    Produk: { screen: ProdukStack },
    Keluar: { screen: Keluar }
  },
  {
    initialRouteName: 'Beranda',
    contentComponent: props => <DrawerContent {...props} />
  }
);
