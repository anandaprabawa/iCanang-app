import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import {
  Image,
  FlatList,
  ScrollView,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  ActivityIndicator,
  View
} from 'react-native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import styles from './styles';
import Header from 'components/Header';
import DrawerContent from 'components/DrawerContent';
import CariScreen, { headerNavigationOptions } from '../Cari';
import PenjualTerdekat from '../PenjualTerdekat';
import { colors } from '../../config/styles';

export default class Beranda extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingInitData: true
    };
  }

  componentDidMount() {
    this.getDataFromFirebase();
  }

  async getDataFromFirebase() {
    const snapshot = await firebase
      .firestore()
      .collection('products')
      .get();
    let items = [];
    snapshot.forEach(doc => items.push(doc.data()));
    this.setState({ data: items, loadingInitData: false });
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  closeDrawer() {
    this.refs.drawer.closeDrawer();
  }

  infiniteScroll() {
    console.log('Hello');
  }

  renderHeader() {
    return (
      <View style={styles.viewBackground}>
        <View style={styles.viewBtnPenjual}>
          <Button
            iconLeft
            block
            bordered
            style={styles.btnPenjualTerdekat}
            onPress={() => this.props.navigation.navigate('PenjualTerdekat')}
          >
            <Icon android="md-pin" ios="ios-pin" style={styles.btnIcon} />
            <Text style={styles.btnText}>cari penjual terdekat</Text>
          </Button>
        </View>
        {this.state.loadingInitData && <ActivityIndicator size="large" />}
      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardViewImage}>
          <Image
            source={{
              uri: item.imageUri
            }}
            style={styles.cardImage}
          />
        </View>
        <Text numberOfLines={2} style={styles.cardTitle}>
          {item.nama}
        </Text>
        <Text style={styles.cardHarga}>Rp {item.harga}</Text>
        <View style={styles.cardLocation}>
          <Icon android="md-pin" ios="ios-pin" style={styles.cardLocationPin} />
          <Text style={styles.cardLocationText}>{item.lokasi}</Text>
        </View>
        <Button block bordered style={styles.btnBeli}>
          <Text style={styles.btnBeliText}>Beli</Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
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

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
            ListHeaderComponent={this.renderHeader()}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={() => this.infiniteScroll()}
            data={this.state.data}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </DrawerLayoutAndroid>
      </View>
    );
  }
}
