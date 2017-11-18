import React, { Component } from 'react';
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
import { TextInput } from 'react-native';
import styles from './styles';
import Header from 'components/HeaderBack';

export default class Daftar extends Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed'
  };

  constructor(props) {
    super(props);
    this.state = {
      securePassword: true,
      iconEyeAndroid: 'md-eye-off',
      iconEyeIOS: 'ios-eye-off'
    };
  }

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

  focusNextField = next => {
    this.refs[next]._root.focus();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header title="Daftar" navigation={this.props.navigation} />
        <Content>
          <Form style={styles.form}>
            <Item style={styles.formItem}>
              <Input
                ref="email"
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => this.focusNextField('namaLengkap')}
                blurOnSubmit={false}
              />
            </Item>
            <Item style={styles.formItem}>
              <Input
                ref="namaLengkap"
                placeholder="Nama Lengkap"
                returnKeyType="next"
                onSubmitEditing={() => this.focusNextField('nomorPonsel')}
                blurOnSubmit={false}
              />
            </Item>
            <Item style={styles.formItem}>
              <Input
                ref="nomorPonsel"
                placeholder="Nomor Ponsel"
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => this.focusNextField('password')}
                blurOnSubmit={false}
              />
            </Item>
            <Item style={styles.formItem}>
              <Input
                ref="password"
                placeholder="Kata Sandi"
                returnKeyType="done"
                secureTextEntry={this.state.securePassword}
              />
              <Icon
                android={this.state.iconEyeAndroid}
                ios={this.state.iconEyeIOS}
                style={styles.iconDisplayPass}
                onPress={() => this.toggleDisplayPassword()}
              />
            </Item>
          </Form>
          <Button block style={styles.buttonSubmit}>
            <Text style={styles.btnText}>Daftar</Text>
          </Button>
          <View style={styles.viewRules}>
            <Text style={styles.viewRulesText}>
              Dengan mendaftar, saya menyetujui{' '}
              <Text style={styles.textRule}>Syarat dan Ketentuan</Text>, serta{' '}
              <Text style={styles.textRule}>Kebijakan Privasi</Text>
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
