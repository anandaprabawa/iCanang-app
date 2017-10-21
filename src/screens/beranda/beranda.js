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
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text>Hello</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={['a', 'b', 'c', 'd']}
              keyExtractor={(item, index) => index}
              renderItem={() => (
                <Card style={styles.card}>
                  <CardItem cardBody style={styles.cardItem}>
                    <Image
                      source={require('../../assets/images/canang-sari.jpg')}
                      style={styles.cardItemImage}
                    />
                  </CardItem>
                  <CardItem style={styles.cardContent}>
                    <View>
                      <Text style={styles.cardTitle} numberOfLines={2}>
                        Cananag sari isi 25 murah meriah area denpasar dan
                        sekitarnya
                      </Text>
                    </View>
                    <View style={styles.cardContentInfo}>
                      <Text style={styles.cardInfoHarga}>Rp 25000</Text>
                      <View style={styles.cardInfoLocation}>
                        <Icon
                          android="md-pin"
                          ios="ios-pin"
                          style={styles.cardLocationPin}
                        />
                        <Text style={styles.cardLocationText}>Denpasar</Text>
                      </View>
                    </View>
                  </CardItem>
                  <CardItem style={[styles.cardItemBeli, styles.cardItem]}>
                    <Button block style={styles.buttonBeli}>
                      <Text>Beli</Text>
                    </Button>
                  </CardItem>
                </Card>
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
