import React, { Component } from 'react';
import { Text } from 'react-native';

export default class PenjualTab extends Component {
  render() {
    return <Text>{this.props.searchText}</Text>;
  }
}
