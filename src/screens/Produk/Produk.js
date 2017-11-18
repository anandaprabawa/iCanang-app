import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
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
      renderContent: false
    };
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  closeDrawer() {
    this.refs.drawer.closeDrawer();
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
              data={['a', 'b', 'c', 'd']}
              keyExtractor={(item, index) => index}
              renderItem={() => (
                <View style={styles.cardContainer}>
                  <View style={styles.cardViewImage}>
                    <Image
                      source={require('../../assets/images/canang-sari.jpg')}
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
