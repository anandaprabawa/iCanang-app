import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Image, FlatList, ScrollView } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Icon,
  Text,
  View
} from 'native-base';
import HeaderComponent from '../../components/header';
import styles from './styles';

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
            <Button iconLeft block bordered style={styles.btnPenjualTerdekat}>
              <Icon android="md-pin" ios="ios-pin" style={styles.btnIcon} />
              <Text style={styles.btnText}>cari penjual terdekat</Text>
            </Button>
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
                    Cananag sari isi 25 murah meriah area denpasar dan
                    sekitarnya
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
  Beranda: { screen: Beranda }
});

export default stack;
