import React from 'react';
import { connectSearchBox } from 'react-instantsearch/connectors';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TextInput,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

export const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchView}>
        <Icon name="search" size={24} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Cari produk..."
          placeholderTextColor={colors.dark}
          underlineColorAndroid="transparent"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          value={currentRefinement}
          onChangeText={text => refine(text)}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flex: 1,
    width: Dimensions.get('window').width - 75,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    backgroundColor: colors.primary
  },
  searchView: {
    backgroundColor: colors.light,
    borderRadius: 3,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  icon: {
    color: colors.dark
  },
  textInput: {
    flex: 1
  }
});
