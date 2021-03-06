import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import { Icon, Button } from 'native-base';
import { colors } from 'styles';

import RenderItem from 'components/ShowProducts';

export const SearchHitsProduk = connectInfiniteHits(
  ({ hits, hasMore, refine, navigation }) => {
    const onEndReached = () => {
      if (hasMore) {
        refine();
      }
    };

    const renderSpinner = () => {
      if (hasMore) {
        return (
          <ActivityIndicator color={colors.primary} style={styles.spinner} />
        );
      }
    };

    const renderFooter = () => {
      return <View style={styles.footer}>{renderSpinner()}</View>;
    };

    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={renderFooter}
          data={hits}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => item.objectID}
          renderItem={({ item }) => (
            <RenderItem item={item} navigation={navigation} />
          )}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 202
  },
  spinner: {
    marginVertical: 10
  }
});
