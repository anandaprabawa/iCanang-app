import React from 'react';
import { connectStateResults } from 'react-instantsearch/connectors';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';
import { colors } from 'styles';

import { SearchHitsProduk } from './SearchHitsProduk';
import { SearchHitsPenjual } from './SearchHitsPenjual';

export default connectStateResults(
  ({ searchState, searchResults, searching, scene, user }) => {
    if (searchState && !searchState.query) {
      return null;
    } else if (searchResults && searchResults.nbHits === 0) {
      return (
        <View style={styles.viewContent}>
          <Text>Hasil tidak ditemukan</Text>
        </View>
      );
    } else if (searching && !searchResults) {
      return (
        <View style={styles.viewContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    } else if (searchState && searchState.query) {
      if (scene === 'produk') return <SearchHitsProduk />;
      if (scene === 'penjual') return <SearchHitsPenjual />;
    }
  }
);

const styles = StyleSheet.create({
  viewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 56 - 20 - 36 - 36
  }
});
