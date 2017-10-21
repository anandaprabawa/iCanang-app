import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text } from 'native-base';
import HeaderComponent from '../../components/header';

class Masuk extends Component {
  static navigationOptions = props => ({
    header: <HeaderComponent title="Masuk" navigation={props.navigation} />
  });

  render() {
    return <Text>Masuk</Text>;
  }
}

const stack = StackNavigator({
  Masuk: { screen: Masuk }
});

export default stack;
