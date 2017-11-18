import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableNativeFeedback,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, { rippleColor } from './styles';
import Header from 'components/Header';

export default class Beranda extends Component {
  static navigationOptions = props => ({
    header: <Header title="Beranda" navigation={props.navigation} />
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewBtnPenjual}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('PenjualTerdekat')}
              background={TouchableNativeFeedback.SelectableBackground()}
            >
              <View style={styles.btnPenjualTerdekat}>
                <Icon name="location-on" style={styles.btnIcon} />
                <Text style={styles.btnText}>CARI PENJUAL TERDEKAT</Text>
              </View>
            </TouchableNativeFeedback>
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
                  <Icon name="location-on" style={styles.cardLocationPin} />
                  <Text style={styles.cardLocationText}>Denpasar</Text>
                </View>
                <TouchableNativeFeedback
                  onPress={() => alert('Beli')}
                  background={TouchableNativeFeedback.Ripple(rippleColor)}
                >
                  <View style={styles.btnBeli}>
                    <Text style={styles.btnBeliText}>Beli</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
