import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import {
  Image,
  FlatList,
  ScrollView,
  DrawerLayoutAndroid,
  View,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Button, Icon, Text, Fab } from 'native-base';

import styles, { spinnerColor } from './styles';
import Header from 'components/HeaderProduk';
import DrawerContent from 'components/DrawerContent';
import TambahProduk from '../TambahProduk';
import ModalDelete from 'components/ModalDelete';
import algolia from 'providers/algolia';
import { AlgoliaProduct } from '../../providers/algolia';

export default class Produk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderContent: false,
      user: firebase.auth().currentUser,
      data: [],
      loadingInitData: true,
      modalVisible: false,
      deleteDoc: null
    };
    this.observer = null;
  }

  componentDidMount() {
    this.getProduk();
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer();
    }
  }

  formatToCurrency(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  closeDrawer() {
    this.refs.drawer.closeDrawer();
  }

  getProduk() {
    this.observer = firebase
      .firestore()
      .collection('products')
      .where('uid', '==', this.state.user.uid)
      .onSnapshot(docSnapshot => {
        let items = [];
        docSnapshot.forEach(doc => {
          const data = Object.assign({}, doc.data(), { id: doc.id });
          items.push(data);
        });
        this.setState({ data: items, loadingInitData: false });
      });
  }

  modalDelete(doc) {
    this.setState({ modalVisible: true, deleteDoc: doc });
  }

  async deleteProduk() {
    this.hideModal();
    AlgoliaProduct.deleteProductsRecord(this.state.deleteDoc.id);
    await firebase
      .firestore()
      .collection('products')
      .doc(this.state.deleteDoc.id)
      .delete();
    await this.deleteImage(this.state.deleteDoc.imageRef);
    this.setState({ deleteDoc: null });
  }

  async deleteImage(imageRef) {
    await firebase
      .storage()
      .ref()
      .child(imageRef)
      .delete();
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  renderItem(item) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardViewImage}>
          <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
        </View>
        <Text numberOfLines={2} style={styles.cardTitle}>
          {item.nama}
        </Text>
        <Text style={styles.cardHarga}>
          Rp {this.formatToCurrency(item.harga)}
        </Text>
        <View style={styles.cardLocation}>
          <Icon android="md-pin" ios="ios-pin" style={styles.cardLocationPin} />
          <Text style={styles.cardLocationText}>{item.lokasi}</Text>
        </View>
        <View style={styles.viewOpsi}>
          <Button
            bordered
            style={styles.btnEdit}
            onPress={() =>
              this.props.navigation.navigate('EditProduk', {
                dataProduk: item
              })
            }
          >
            <Text style={styles.btnEditText}>Edit</Text>
          </Button>
          <Button
            bordered
            style={styles.btnDelete}
            onPress={() => this.modalDelete(item)}
          >
            <Icon
              android="md-trash"
              ios="ios-trash"
              style={styles.iconDelete}
            />
          </Button>
        </View>
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
              scene="Produk"
            />
          )}
        >
          <Header
            title="Produk"
            navigation={this.props.navigation}
            openDrawer={() => this.openDrawer()}
          />
          {this.state.loadingInitData && (
            <ActivityIndicator
              size="large"
              color={spinnerColor}
              style={styles.loadingInitData}
            />
          )}
          {!this.state.loadingInitData && (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              numColumns={2}
              data={this.state.data}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => this.renderItem(item)}
            />
          )}

          <View style={{ flex: 1 }}>
            <Fab
              active={false}
              containerStyle={{}}
              style={styles.fabBtn}
              position="bottomRight"
              onPress={() => this.props.navigation.navigate('TambahProduk')}
            >
              <Icon android="md-add" ios="ios-add" />
            </Fab>
          </View>
        </DrawerLayoutAndroid>
        <ModalDelete
          visibleModal={this.state.modalVisible}
          hideModal={() => this.hideModal()}
          deleteDoc={() => this.deleteProduk()}
        />
      </View>
    );
  }
}
