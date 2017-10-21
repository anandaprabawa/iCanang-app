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
  View
} from 'native-base';
import { TextInput } from 'react-native';
import styles from './styles';
import HeaderAuthComponent from '../../components/headerAuth';

export default class Daftar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderContent: false
    };
  }

  focusNextField = next => {
    this.refs[next].focus();
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
            <Form>
              <Item floatingLabel style={styles.formItem}>
                <Label>Email</Label>
                <Input
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => this._nama._root.focus()}
                />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label>Nama Lengkap</Label>
                <Input getRef={c => (this._nama = c)} returnKeyType="next" />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label>Nomor Ponsel</Label>
                <Input keyboardType="phone-pad" />
              </Item>
              <Item floatingLabel style={styles.formItem}>
                <Label>Kata Sandi</Label>
                <Input />
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
