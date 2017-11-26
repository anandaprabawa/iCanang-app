import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Text } from 'react-native';

export default class ProdukTab extends Component {
  componentDidMount() {}

  getData() {
    firebase
      .firestore()
      .collection('products')
      .orderBy('nama')
      .startAt(this.props.searchText)
      .endAt(this.props.searchText)
      .then(docs => {
        console.log(docs);
      });
  }

  render() {
    return <Text>{this.props.searchText}</Text>;
  }
}
