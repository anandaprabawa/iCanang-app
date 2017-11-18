import React, { Component } from 'react';
import Header from 'components/HeaderCari';
import { TabNavigator } from 'react-navigation';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import styles, { pressColor } from './styles';

import Produk from './ProdukTab';
import Penjual from './PenjualTab';

export default class Cari extends Component {
  static navigationOptions = props => ({
    header: <Header title="Cari" navigation={props.navigation} />
  });

  state = {
    index: 0,
    routes: [
      { key: 'produk', title: 'Produk' },
      { key: 'penjual', title: 'Penjual' }
    ]
  };

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

  renderScene = SceneMap({
    produk: Produk,
    penjual: Penjual
  });

  render() {
    const initialLayout = {
      height: 0,
      width: Dimensions.get('window').width
    };

    return (
      <View style={styles.viewContainer}>
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
