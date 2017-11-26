import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import Header from 'components/HeaderCari';
import { TabNavigator } from 'react-navigation';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import styles, { pressColor } from './styles';
import Produk from './ProdukTab';
import Penjual from './PenjualTab';

export default class Cari extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'produk', title: 'Produk' },
        { key: 'penjual', title: 'Penjual' }
      ],
      searchText: null,
      search: false
    };
  }

  onSearchText(text) {
    this.setState({ searchText: text });
  }

  onSubmitSearch() {
    // this.setState({ search: true });
    // this.getData();;
  }

  getData() {
    firebase
      .firestore()
      .collection('products')
      .orderBy('nama')
      .startAt(this.state.searchText)
      .endAt(this.state.searchText)
      .then(docs => {
        console.log(docs);
      });
  }

  onIndexChange = index => this.setState({ index });

  renderHeader = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tabBarLabel}
      tabStyle={styles.tabBarIndividu}
      pressColor={pressColor}
      pressOpacity={1}
    />
  );

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'produk':
        return (
          <Produk
            searchText={this.state.searchText}
            searchStatus={this.state.search}
          />
        );
      case 'penjual':
        return <Penjual searchText={this.state.searchText} />;
      default:
        return null;
    }
  };

  render() {
    const initialLayout = {
      height: 0,
      width: Dimensions.get('window').width
    };

    return (
      <View style={styles.viewContainer}>
        <Header
          title="Cari"
          navigation={this.props.navigation}
          onSearchText={text => this.onSearchText(text)}
          onSubmitSearch={() => this.onSubmitSearch()}
        />
        <TabViewAnimated
          style={styles.tabViewAnimated}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onIndexChange={this.onIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}
