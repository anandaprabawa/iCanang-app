import React from 'react';
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import { Icon, Button } from 'native-base';
import { colors } from 'styles';

const formatToCurrency = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export default ({ item }) => {
  return (
    <TouchableHighlight
      // onPress={() => alert('press')}
      underlayColor={underlayColor}
      style={styles.touchable}
    >
      <View style={styles.cardContainer}>
        <View style={styles.cardViewImage}>
          <Image
            source={{
              uri: item.imageUri
            }}
            style={styles.cardImage}
          />
        </View>
        <Text numberOfLines={2} style={styles.cardTitle}>
          {item.nama}
        </Text>
        <Text style={styles.cardHarga}>Rp {formatToCurrency(item.harga)}</Text>
        <View style={styles.cardLocation}>
          <Icon android="md-pin" ios="ios-pin" style={styles.cardLocationPin} />
          <Text style={styles.cardLocationText}>{item.lokasi}</Text>
        </View>
        <Button block bordered style={styles.btnBeli}>
          <Text style={styles.btnBeliText}>Beli</Text>
        </Button>
      </View>
    </TouchableHighlight>
  );
};

const underlayColor = colors.secondary;

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: colors.background
  },
  touchable: {
    width: '50%'
  },
  cardContainer: {
    width: '100%',
    padding: 12,
    borderWidth: 0.17,
    borderColor: `${colors.dark}33`,
    backgroundColor: colors.light
  },
  cardViewImage: {
    marginBottom: 5
  },
  cardImage: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 2
  },
  cardTitle: {
    marginBottom: 3,
    fontSize: 14,
    color: `${colors.dark}dd`
  },
  cardHarga: {
    fontSize: 15,
    marginBottom: 3,
    fontWeight: 'bold',
    color: colors.success
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  cardLocationPin: {
    fontSize: 14,
    marginRight: 5,
    color: `${colors.dark}aa`
  },
  cardLocationText: {
    fontSize: 14,
    color: `${colors.dark}aa`
  },
  btnBeli: {
    marginTop: 'auto',
    height: 28,
    borderRadius: 2,
    borderColor: colors.primary,
    paddingTop: 0,
    paddingBottom: 0
  },
  btnBeliText: {
    color: colors.primary
  }
});
