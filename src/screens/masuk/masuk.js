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
import HeaderAuthComponent from '../../components/headerAuth';

export default class Masuk extends Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed'
  };

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
        <HeaderAuthComponent title="Masuk" navigation={this.props.navigation} />
        {this.state.renderContent && (
          <Content>
            <Form style={styles.form}>
              <Item style={styles.formItem}>
                <Input
                  ref="email"
                  placeholder="Email"
                  keyboardType="email-address"
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
            <Button block style={styles.buttonSubmit}>
              <Text style={styles.btnText}>Masuk</Text>
            </Button>
            <View style={styles.viewRules}>
              <Text style={styles.textLupaKataSandi}>Lupa kata sandi?</Text>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}
