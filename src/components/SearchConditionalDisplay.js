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

import { SearchHits } from './SearchHits';

export default connectStateResults(
  ({ searchState, searchResults, searching }) => {
    if (searchState && !searchState.query) {
      return <Text>Kosong</Text>;
    }

    if (searchResults && searchResults.nbHits === 0) {
      return (
        <View style={styles.viewContent}>
          <Text>Hasil tidak ditemukan</Text>
        </View>
      );
    }

    if (searchState.query && searching) {
      return (
        <View style={styles.viewContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (searchState && searchState.query) {
      return <SearchHits />;
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
