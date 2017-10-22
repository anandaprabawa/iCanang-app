import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  View,
  Icon
} from 'native-base';
import { TextInput } from 'react-native';
import styles from './styles';
import HeaderAuthComponent from '../../components/headerAuth';

export default class Daftar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderContent: false,
      securePassword: true,
      iconEyeAndroid: 'md-eye-off',
      iconEyeIOS: 'ios-eye-off'
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({ renderContent: true });
    }, 0);
  }

  render() {
    return (
      <Container>
        <HeaderAuthComponent
          title="Daftar"
          navigation={this.props.navigation}
        />
        {this.state.renderContent && (
          <Content>
            <Form style={styles.form}>
              <Item style={styles.formItem}>
                <Input
                  ref="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => this.focusNextField('namaLengkap')}
                />
              </Item>
              <Item style={styles.formItem}>
                <Input
                  ref="namaLengkap"
                  placeholder="Nama Lengkap"
                  returnKeyType="next"
                  onSubmitEditing={() => this.focusNextField('nomorPonsel')}
                />
              </Item>
              <Item style={styles.formItem}>
                <Input
                  ref="nomorPonsel"
                  placeholder="Nomor Ponsel"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => this.focusNextField('password')}
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
                  onPress={this.toggleDisplayPassword}
                />
              </Item>
            </Form>
            <Button
              block
              style={styles.buttonSubmit}
              onPress={() => this.refs.satu.focus()}
            >
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
        )}
      </Container>
    );
  }
}
