import React, { Component } from 'react';
import { Image, FlatList, ScrollView, DrawerLayoutAndroid } from 'react-native';
import { Container, Button, Icon, Text, View, Fab } from 'native-base';
import styles from './styles';
import Header from 'components/HeaderProduk';
import TambahProduk from '../TambahProduk';

export default class Produk extends Component {
  static navigationOptions = props => ({
    header: <Header title="Produk" navigation={props.navigation} />
  });

  render() {
    return (
      <Container>
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
      </Container>
    );
  }
}
