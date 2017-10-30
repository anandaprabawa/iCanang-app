import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Image, FlatList, ScrollView } from 'react-native';
import { Container, Button, Icon, Text, View } from 'native-base';
import styles from './styles';
import HeaderComponent from '../../components/header';
import CariScreen, { headerNavigationOptions } from '../cari';
import PenjualTerdekat from '../penjualTerdekat';

class Beranda extends Component {
  static navigationOptions = props => ({
    header: <HeaderComponent title="Beranda" navigation={props.navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {
      renderContent: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ renderContent: true });
    }, 0);
  }

  render() {
    return (
      <Container>
        {this.state.renderContent && (
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
                  <Button block bordered style={styles.btnBeli}>
                    <Text style={styles.btnBeliText}>Beli</Text>
                  </Button>
                </View>
              )}
            />
          </ScrollView>
        )}
      </Container>
    );
  }
}

const stack = StackNavigator({
  Beranda: { screen: Beranda },
  Cari: {
    screen: CariScreen,
    navigationOptions: headerNavigationOptions
  },
  PenjualTerdekat: { screen: PenjualTerdekat }
});

export default stack;
