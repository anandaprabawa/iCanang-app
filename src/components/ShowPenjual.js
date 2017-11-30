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

export default ({ item }) => {
  const showImage = uri => {
    if (uri) {
      return { uri: uri };
    } else {
      return require('images/no-image.jpg');
    }
  };

  return (
    <TouchableHighlight
      // onPress={() => alert('press')}
      underlayColor={underlayColor}
      style={styles.touchable}
    >
      <View style={styles.viewContainer}>
        <Image source={showImage(item.imageUri)} style={styles.image} />
        <Text style={styles.text}>{item.namaLengkap}</Text>
      </View>
    </TouchableHighlight>
  );
};

const underlayColor = colors.secondary;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.dark}11`
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15
  },
  text: {
    fontSize: 16,
    color: colors.dark
  }
});
