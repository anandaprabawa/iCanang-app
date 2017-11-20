import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { Image, FlatList, ScrollView, DrawerLayoutAndroid } from 'react-native';
import { Container, Button, Icon, Text, View, Fab } from 'native-base';
import styles from './styles';
import Header from 'components/HeaderProduk';
import DrawerContent from 'components/DrawerContent';
import TambahProduk from '../TambahProduk';

export default class Produk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderContent: false,
      user: firebase.auth().currentUser,
      data: []
    };
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.getProduk();
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  closeDrawer() {
    this.refs.drawer.closeDrawer();
  }

  async getProduk() {
    const snapshot = await firebase
      .firestore()
      .collection('products')
      .where('uid', '==', this.state.user.uid)
      .get();

    let items = [];
    snapshot.forEach(doc => {
      items.push(doc.data());
    });
    this.setState({ data: items });
  }

  render() {
    return (
      <Container>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              numColumns={2}
              data={this.state.data}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <View style={styles.cardViewImage}>
                    <Image
                      source={{ uri: item.imageUri }}
                      style={styles.cardImage}
                    />
                  </View>
                  <Text numberOfLines={2} style={styles.cardTitle}>
                    {item.nama}
                  </Text>
                  <Text style={styles.cardHarga}>Rp {item.harga}</Text>
                  <View style={styles.cardLocation}>
                    <Icon
                      android="md-pin"
                      ios="ios-pin"
                      style={styles.cardLocationPin}
                    />
                    <Text style={styles.cardLocationText}>{item.lokasi}</Text>
                  </View>
                  <View style={styles.viewOpsi}>
                    <Button bordered style={styles.btnEdit}>
                      <Text style={styles.btnEditText}>Edit</Text>
                    </Button>
                    <Button bordered style={styles.btnDelete}>
                      <Icon
                        android="md-trash"
                        ios="ios-trash"
                        style={styles.iconDelete}
                      />
                    </Button>
                  </View>
                </View>
              )}
            />
          </ScrollView>
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
      </Container>
    );
  }
}
