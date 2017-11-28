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
import { Icon, Button, Text } from 'native-base';

import styles, { spinnerColor, underlayColor } from './styles';
import { colors } from 'styles';
import Header from 'components/Header';
import DrawerContent from 'components/DrawerContent';
import PenjualTerdekat from '../PenjualTerdekat';
import RenderItem from 'components/ShowProducts';

export default class Beranda extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      lastItem: null,
      endItem: false,
      loadingInitData: true,
      loadingInfiniteScroll: true
    };
  }

  componentDidMount() {
    this.getDataFromFirebase();
  }

  async getDataFromFirebase() {
    const snapshot = await firebase
      .firestore()
      .collection('products')
      .orderBy('nama')
      .limit(4)
      .get();

    if (snapshot.docs.length === 0) {
      this.setState({ loadingInfiniteScroll: false });
    }

    let items = [];
    const lastItem = snapshot.docs[snapshot.docs.length - 1];
    snapshot.forEach(doc => items.push(doc.data()));
    this.setState({
      data: items,
      loadingInitData: false,
      lastItem: lastItem
    });
  }

  async getInfiniteScrollData() {
    if (!this.state.loadingInitData && !this.state.endItem) {
      const snapshot = await firebase
        .firestore()
        .collection('products')
        .orderBy('nama')
        .startAfter(this.state.lastItem.data().nama)
        .limit(4)
        .get();

      if (snapshot.docs.length === 0) {
        this.setState({ endItem: true, loadingInfiniteScroll: false });
        return;
      }

      let items = [];
      const lastItem = snapshot.docs[snapshot.docs.length - 1];
      snapshot.forEach(doc => items.push(doc.data()));
      const newItems = this.state.data.concat(items);
      this.setState({
        data: newItems,
        loadingInitData: false,
        lastItem: lastItem
      });
    } else {
      return;
    }
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  closeDrawer() {
    this.refs.drawer.closeDrawer();
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
        {this.state.loadingInitData && (
          <ActivityIndicator size="large" color={spinnerColor} />
        )}
      </View>
    );
  }

  renderFooter() {
    if (this.state.loadingInfiniteScroll && !this.state.loadingInitData) {
      return (
        <View style={styles.loadingInfiniteScroll}>
          <ActivityIndicator color={spinnerColor} />
        </View>
      );
    }
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
            ListHeaderComponent={this.renderHeader()}
            ListFooterComponent={this.renderFooter()}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={() => this.getInfiniteScrollData()}
            data={this.state.data}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <RenderItem item={item} />}
          />
        </DrawerLayoutAndroid>
      </View>
    );
  }
}
