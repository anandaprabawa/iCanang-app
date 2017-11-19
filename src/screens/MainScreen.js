import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import CardStack from 'react-navigation/lib/views/CardStack/CardStackStyleInterpolator';

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

const BerandaStack = StackNavigator(
  {
    Beranda: { screen: Beranda },
    Cari: { screen: Cari },
    PenjualTerdekat: { screen: PenjualTerdekat }
  },
  {
    headerMode: 'none'
  }
);

const ProdukStack = StackNavigator({
  Produk: { screen: Produk },
  TambahProduk: { screen: TambahProduk }
});

export default StackNavigator(
  {
    Beranda: { screen: BerandaStack },
    Daftar: { screen: Daftar },
    Masuk: { screen: Masuk },
    Produk: { screen: TambahProduk },
    Keluar: { screen: Keluar }
  },
  {
    initialRouteName: 'Beranda',
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateX }] };
      }
    })
  }
);
