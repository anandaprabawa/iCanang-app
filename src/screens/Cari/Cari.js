import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Icon, Item, Input } from 'native-base';
import styles, {
  headerStyle,
  headerTitleStyle,
  headerBackTitleStyle,
  headerTintColor,
  placeholderTextColor
} from './style';

class HeaderTitle extends Component {
  render() {
    return (
      <View style={styles.viewInput}>
        <Item style={styles.item}>
          <Icon android="md-search" ios="ios-search" style={styles.icon} />
          <Input
            placeholder="Cari produk atau penjual"
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid="transparent"
            style={styles.input}
          />
        </Item>
      </View>
    );
  }
}

export default {
  drawerLockMode: 'locked-closed',
  headerTitle: <HeaderTitle />,
  headerStyle: headerStyle,
  headerTitleStyle: headerTitleStyle,
  headerBackTitleStyle: headerBackTitleStyle,
  headerTintColor: '#fff'
};
