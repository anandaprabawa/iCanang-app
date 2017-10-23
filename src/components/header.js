import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Title } from 'native-base';
import { colors, androidStatusBarColor } from '../styles/variables';

export default class HeaderComponent extends Component {
  render() {
    return (
      <Header
        style={{
          backgroundColor: colors.primary
        }}
        androidStatusBarColor={androidStatusBarColor}
      >
        <Left>
          <Button
            transparent
            iconLeft
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Icon android="md-menu" ios="ios-menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Cari')}
          >
            <Icon android="md-search" ios="ios-search" />
          </Button>
        </Right>
      </Header>
    );
  }
}
