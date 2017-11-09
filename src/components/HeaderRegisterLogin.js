import React, { Component } from 'react';
import { Header, Left, Button, Icon, Right, Body, Title } from 'native-base';
import { colors, androidStatusBarColor } from 'styles';

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
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon android="md-arrow-back" ios="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
