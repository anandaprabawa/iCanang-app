import React, { Component } from 'react';
import firebase from 'react-native-firebase';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import Header from 'components/HeaderBack';

export default class DetailProduk extends Component {
  constructor() {
    super();
    this.state = {
      penjualProduk: null
    };
  }

  componentDidMount() {
    this.getPenjualProduk(this.props.navigation.state.params.item.uid);
  }

  formatToCurrency = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  formatPhoneNumber(num) {
    const phone = num.match(/(?!0).+/g);
    const result = `62${phone[0]}`;
    return result;
  }

  async getPenjualProduk(uid) {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    this.setState({ penjualProduk: snapshot.data() });
  }

  onPressBtnBeli() {
    if (this.state.penjualProduk) {
      const { item } = this.props.navigation.state.params;
      const phoneNum = this.formatPhoneNumber(
        this.state.penjualProduk.nomorPonsel
      );
      const encodeNama = '"' + item.nama.replace(/\s/, '%20') + '"';
      const harga = 'Rp ' + this.formatToCurrency(item.harga);
      const encodeHarga = harga.replace(/\s/, '%20');
      const text =
        '*PRODUK*' + '%0A' + encodeNama + '%0A' + encodeHarga + '%0A%0A';
      const url = `https://api.whatsapp.com/send?phone=${phoneNum}&&text=${
        text
      }`;
      Linking.openURL(url).catch(err => alert(err));
    }
  }

  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <View>
        <Header title="Detail Produk" navigation={this.props.navigation} />
        <View style={styles.viewScrollContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <View style={styles.section} />
            <Text style={styles.nama}>{item.nama}</Text>
            <Text style={styles.harga}>
              Rp {this.formatToCurrency(item.harga)}
            </Text>
            <View style={styles.penjual}>
              <Icon name="person" size={18} style={styles.iconPerson} />
              <Text>
                {this.state.penjualProduk
                  ? this.state.penjualProduk.namaLengkap
                  : 'Penjual'}
              </Text>
            </View>
            <TouchableNativeFeedback
              disabled={this.state.penjualProduk ? false : true}
              onPress={() => this.onPressBtnBeli()}
            >
              <View style={styles.btnBeli}>
                <Text style={styles.btnBeliText}>Beli via Whatsapp</Text>
              </View>
            </TouchableNativeFeedback>
          </ScrollView>
        </View>
      </View>
    );
  }
}
