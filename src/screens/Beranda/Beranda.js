import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import {
  Image,
  FlatList,
  ScrollView,
  DrawerLayoutAndroid,
  ToolbarAndroid
} from 'react-native';
import { Container, Content, Button, Icon, Text, View } from 'native-base';
import styles from './styles';
import Header from 'components/Header';
import DrawerContent from 'components/DrawerContent';
import CariScreen, { headerNavigationOptions } from '../Cari';
import PenjualTerdekat from '../PenjualTerdekat';
import { colors } from '../../config/styles';

export default class Beranda extends Component {
  constructor(props) {
    super(props);
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  closeDrawer() {
    this.refs.drawer.closeDrawer();
  }

  render() {
    return (
      <Container style={styles.container}>
        <DrawerLayoutAndroid
          ref="drawer"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => (
            <DrawerContent
              navigation={this.props.navigation}
              closeDrawer={() => this.closeDrawer()}
              scene="Beranda"
            />
          )}
        >
          <Header
            title="Beranda"
            openDrawer={() => this.openDrawer()}
            navigation={this.props.navigation}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewBtnPenjual}>
              <Button
                iconLeft
                block
                bordered
                style={styles.btnPenjualTerdekat}
                onPress={() =>
                  this.props.navigation.navigate('PenjualTerdekat')}
              >
                <Icon android="md-pin" ios="ios-pin" style={styles.btnIcon} />
                <Text style={styles.btnText}>cari penjual terdekat</Text>
              </Button>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              numColumns={2}
              data={['a', 'b', 'c', 'd']}
              keyExtractor={(item, index) => index}
              renderItem={() => (
                <View style={styles.cardContainer}>
                  <View style={styles.cardViewImage}>
                    <Image
                      source={require('images/canang-sari.jpg')}
                      style={styles.cardImage}
                    />
                  </View>
                  <Text numberOfLines={2} style={styles.cardTitle}>
                    Canang sari isi 25 murah meriah area denpasar dan sekitarnya
                  </Text>
                  <Text style={styles.cardHarga}>Rp 25000</Text>
                  <View style={styles.cardLocation}>
                    <Icon
                      android="md-pin"
                      ios="ios-pin"
                      style={styles.cardLocationPin}
                    />
                    <Text style={styles.cardLocationText}>Denpasar</Text>
                  </View>
                  <Button block bordered style={styles.btnBeli}>
                    <Text style={styles.btnBeliText}>Beli</Text>
                  </Button>
                </View>
              )}
            />
          </ScrollView>
        </DrawerLayoutAndroid>
      </Container>
    );
  }
}
