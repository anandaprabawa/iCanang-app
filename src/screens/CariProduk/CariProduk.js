import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { InstantSearch, Configure } from 'react-instantsearch/native';

import styles from './styles';
import Header from 'components/HeaderCari';
import { SearchHits } from 'components/SearchHitsProduk';
import SearchConditionalDisplay from 'components/SearchConditionalDisplay.js';

export default class CariProduk extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <InstantSearch
          appId="G0VLMGQYCH"
          apiKey="074b22251e1397f671795b47638115dc"
          indexName="products"
        >
          <Header
            placeholder="Cari Produk"
            navigation={this.props.navigation}
          />
          <View style={styles.viewLogo}>
            <Image
              source={require('images/search-by-algolia.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Configure hitsPerPage={6} />
          <SearchConditionalDisplay scene="produk" />
        </InstantSearch>
      </View>
    );
  }
}
