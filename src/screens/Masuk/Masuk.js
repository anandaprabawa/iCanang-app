import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  View,
  Icon
} from 'native-base';
import { TextInput, ActivityIndicator } from 'react-native';
import styles, { spinnerColor } from './styles';
import Header from 'components/HeaderBack';

export default class Masuk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securePassword: true,
      iconEyeAndroid: 'md-eye-off',
      iconEyeIOS: 'ios-eye-off',
      email: null,
      password: null,
      loading: false
    };
  }

  focusNextField = next => {
    this.refs[next]._root.focus();
  };

  toggleDisplayPassword = () => {
    if (this.state.securePassword) {
      this.setState({
        securePassword: false,
        iconEyeAndroid: 'md-eye',
        iconEyeIOS: 'ios-eye'
      });
    } else {
      this.setState({
        securePassword: true,
        iconEyeAndroid: 'md-eye-off',
        iconEyeIOS: 'ios-eye-off'
      });
    }
  };

  onPressMasuk = () => {
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (user) {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Beranda' })]
          });
          this.props.navigation.dispatch(resetAction);
          this.setState({ loading: false });
        }
      });
  };

  renderSpinnerOrButton() {
    if (this.state.loading) {
      return (
        <View style={styles.viewSpinner}>
          <ActivityIndicator size="large" color={spinnerColor} />
        </View>
      );
    } else {
      return (
        <Button
          block
          style={styles.buttonSubmit}
          onPress={() => this.onPressMasuk()}
        >
          <Text style={styles.btnText}>Masuk</Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header title="Masuk" navigation={this.props.navigation} />
        <Content>
          <Form style={styles.form}>
            <Item style={styles.formItem}>
              <Input
                ref="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                onSubmitEditing={() => this.focusNextField('password')}
              />
            </Item>
            <Item style={styles.formItem}>
              <Input
                ref="password"
                placeholder="Kata Sandi"
                autoCapitalize="none"
                returnKeyType="done"
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry={this.state.securePassword}
              />
              <Icon
                android={this.state.iconEyeAndroid}
                ios={this.state.iconEyeIOS}
                style={styles.iconDisplayPass}
                onPress={this.toggleDisplayPassword}
              />
            </Item>
          </Form>
          {this.renderSpinnerOrButton()}
          <View style={styles.viewRules}>
            <Text style={styles.textLupaKataSandi}>Lupa kata sandi?</Text>
          </View>
        </Content>
      </Container>
    );
  }
}
