import React, { Component } from 'react';
import firebase from 'react-native-firebase';

import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import styles, { spinnerColor } from './styles';

import Header from 'components/HeaderBack';
import RenderItem from 'components/ShowProducts';

export default class DetailPenjual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: props.navigation.state.params.user,
      data: [],
      loadingData: false,
      userID:
        props.navigation.state.params.user.id ||
        props.navigation.state.params.user.objectID
    };
  }

  componentDidMount() {
    this.getProducts();
    console.log(this.state.selectedUser);
  }

  hasImage() {
    if (this.state.selectedUser.imageUri) {
      return { uri: this.state.selectedUser.imageUri };
    } else {
      return require('images/no-image.jpg');
    }
  }

  async getProducts() {
    this.setState({ loadingData: true });
    const snapshots = await firebase
      .firestore()
      .collection('products')
      .where('uid', '==', this.state.userID)
      .get();
    let items = [];
    snapshots.forEach(item => {
      items.push(item.data());
    });
    this.setState({ data: items, loadingData: false });
  }

  renderItem(item) {
    return (
      <View>
        <Image source={{ uri: item.imageUri }} />
        <Text>{item.nama}</Text>
        <Text>{item.harga}</Text>
      </View>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Header title="Penjual" navigation={this.props.navigation} />
        <View>
          <View style={styles.viewUser}>
            <Image source={this.hasImage()} style={styles.userImage} />
            <View>
              <Text style={styles.userText}>
                {this.state.selectedUser.namaLengkap}
              </Text>
              <Text style={styles.userNomorPonsel}>
                {this.state.selectedUser.nomorPonsel}
              </Text>
            </View>
          </View>
          <View style={styles.viewProducts}>
            <View style={styles.viewProdukDijual}>
              <Text style={styles.textProdukDijual}>PRODUK YANG DIJUAL</Text>
            </View>
            {this.state.loadingData && (
              <View style={styles.viewloadingData}>
                <ActivityIndicator size="large" color={spinnerColor} />
              </View>
            )}
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              numColumns={2}
              data={this.state.data}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <RenderItem item={item} navigation={this.props.navigation} />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
