import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import CardStack from 'react-navigation/lib/views/CardStack/CardStackStyleInterpolator';

// screens
import Beranda from './Beranda';
import CariProduk from './CariProduk';
import CariPenjual from './CariPenjual';
import Daftar from './Daftar';
import Masuk from './Masuk';
import PenjualTerdekat from './PenjualTerdekat';
import Produk from './Produk';
import Keluar from './Keluar';
import TambahProduk from './TambahProduk';
import EditProduk from './EditProduk';
import Profil from './Profil';
import DetailPenjual from './DetailPenjual';
import DetailProduk from './DetailProduk';
import LupaPassword from './LupaPassword';
import GantiEmail from './GantiEmail';
import GantiPassword from './GantiPassword';

const BerandaStack = StackNavigator(
  {
    Beranda: { screen: Beranda }
  },
  {
    initialRouteName: 'Beranda',
    headerMode: 'none'
  }
);

const ProdukStack = StackNavigator(
  {
    Beranda: { screen: Beranda },
    Produk: { screen: Produk },
    TambahProduk: { screen: TambahProduk }
  },
  { initialRouteName: 'Produk', headerMode: 'none' }
);

export default StackNavigator(
  {
    Beranda: { screen: Beranda },
    Daftar: { screen: Daftar },
    Masuk: { screen: Masuk },
    Profil: { screen: Profil },
    Produk: { screen: Produk },
    Keluar: { screen: Keluar },
    CariProduk: { screen: CariProduk },
    CariPenjual: { screen: CariPenjual },
    PenjualTerdekat: { screen: PenjualTerdekat },
    TambahProduk: { screen: TambahProduk },
    EditProduk: { screen: EditProduk },
    DetailPenjual: { screen: DetailPenjual },
    DetailProduk: { screen: DetailProduk },
    LupaPassword: { screen: LupaPassword },
    GantiEmail: { screen: GantiEmail },
    GantiPassword: { screen: GantiPassword }
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

        switch (scene.route.routeName) {
          case 'Beranda':
          case 'Daftar':
          case 'Masuk':
          case 'Profil':
          case 'Produk':
          case 'Keluar':
            return { opacity, transform: [{ translateX }] };
            break;
          default:
            return CardStack.forFadeFromBottomAndroid(sceneProps);
            break;
        }
      }
    })
  }
);
