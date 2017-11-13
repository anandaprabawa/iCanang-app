import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native';

// screens
import Beranda from './Beranda';
import Cari from './Cari';
import Daftar from './Daftar';
import Masuk from './Masuk';
import PenjualTerdekat from './PenjualTerdekat';
import Produk from './Produk';
import Keluar from './Keluar';

export default StackNavigator(
  {
    Beranda: { screen: Beranda },
    Cari: { screen: Cari },
    Daftar: { screen: Daftar },
    Masuk: { screen: Masuk },
    PenjualTerdekat: { screen: PenjualTerdekat },
    Produk: { screen: Produk },
    Keluar: { screen: Keluar }
  },
  {
    initialRouteName: 'Beranda',
    headerMode: 'none'
  }
);
