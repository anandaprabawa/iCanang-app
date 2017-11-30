import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Text,
  View,
  Icon
} from 'native-base';
import { TextInput, ActivityIndicator, ScrollView } from 'react-native';

import styles, { spinnerColor } from './styles';
import Header from 'components/HeaderBack';
import { AlgoliaPenjual } from 'providers/algolia';

export default class Daftar extends Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed'
  };

  constructor(props) {
    super(props);
    this.state = {
      securePassword: true,
      iconEyeAndroid: 'md-eye-off',
      iconEyeIOS: 'ios-eye-off',
      email: null,
      namaLengkap: null,
      nomorPonsel: null,
      password: null,
      loading: false,
      displayError: false,
      errorEmail: null,
      errorPassword: null
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

  onPressDaftar() {
    this.setState({
      errorEmail: null,
      errorPassword: null
    });
    if (this.checkInputError() === null) {
      this.setState({ loading: true });
      const credential = {
        email: this.state.email,
        password: this.state.password
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(credential.email, credential.password)
        .then(async user => {
          user.sendEmailVerification();
          await this.addFirebaseData(user.uid);
          await AlgoliaPenjual.getPenjualById(user.uid);
          await this.props.navigation.dispatch(
            NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Beranda' })]
            })
          );
        })
        .catch(error => {
          if (error) {
            this.setState({ loading: false });
            this.errorFirebase(error);
          }
        });
    } else {
      this.setState({ displayError: true });
    }
  }

  errorFirebase(error) {
    switch (error.code) {
      case 'auth/invalid-email':
        this.setState({ errorEmail: 'Format email salah' });
        break;
      case 'auth/email-already-in-use':
        this.setState({ errorEmail: 'Email sudah terdaftar' });
        break;
      case 'auth/weak-password':
        this.setState({
          errorPassword: 'Password harus lebih dari 6 karakter'
        });
        break;
      default:
        this.setState({ errorEmail: null, errorPassword: null });
        break;
    }
  }

  async addFirebaseData(uid) {
    const data = {
      namaLengkap: this.state.namaLengkap,
      nomorPonsel: this.state.nomorPonsel
    };

    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .set(data);
  }

  checkInputError() {
    const inputErrors = {
      email: null,
      namaLengkap: null,
      nomorPonsel: null,
      password: null
    };

    if (this.state.email === null || this.state.email === '') {
      inputErrors.email = 'Email harus diisi';
    }
    if (this.state.namaLengkap === null || this.state.namaLengkap === '') {
      inputErrors.namaLengkap = 'Nama lengkap harus diisi';
    }
    if (this.state.nomorPonsel === null || this.state.nomorPonsel === '') {
      inputErrors.nomorPonsel = 'Nomor ponsel harus diisi';
    }
    if (isNaN(this.state.nomorPonsel)) {
      inputErrors.nomorPonsel = 'Nomor ponsel berupa angka';
    }
    if (this.state.password === null || this.state.password === '') {
      inputErrors.password = 'Kata sandi harus diisi';
    }

    if (
      this.state.email &&
      this.state.namaLengkap &&
      this.state.nomorPonsel &&
      this.state.password
    ) {
      return null;
    } else {
      return inputErrors;
    }
  }

  displayError(input) {
    if (this.state.displayError && this.checkInputError() !== null) {
      const error = this.checkInputError();

      if (error.email && input === 'email') {
        return <Text style={styles.displayError}>{error.email}</Text>;
      }
      if (error.namaLengkap && input === 'namaLengkap') {
        return <Text style={styles.displayError}>{error.namaLengkap}</Text>;
      }
      if (error.nomorPonsel && input === 'nomorPonsel') {
        return <Text style={styles.displayError}>{error.nomorPonsel}</Text>;
      }
      if (error.password && input === 'password') {
        return <Text style={styles.displayError}>{error.password}</Text>;
      }
    } else if (this.state.errorEmail || this.state.errorPassword) {
      if (input === 'email') {
        return <Text style={styles.displayError}>{this.state.errorEmail}</Text>;
      }
      if (input === 'password') {
        return (
          <Text style={styles.displayError}>{this.state.errorPassword}</Text>
        );
      }
    }
  }

  renderButtonOrSpinner() {
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
          onPress={() => this.onPressDaftar()}
        >
          <Text style={styles.btnText}>Daftar</Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header title="Daftar" navigation={this.props.navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <Form style={styles.form}>
            <Item style={styles.formItem}>
              <Input
                ref="email"
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                onSubmitEditing={() => this.focusNextField('namaLengkap')}
                blurOnSubmit={false}
              />
            </Item>
            {this.displayError('email')}
            <Item style={styles.formItem}>
              <Input
                ref="namaLengkap"
                placeholder="Nama Lengkap"
                autoCapitalize="words"
                returnKeyType="next"
                onChangeText={namaLengkap => this.setState({ namaLengkap })}
                value={this.state.namaLengkap}
                onSubmitEditing={() => this.focusNextField('nomorPonsel')}
                blurOnSubmit={false}
              />
            </Item>
            {this.displayError('namaLengkap')}
            <Item style={styles.formItem}>
              <Input
                ref="nomorPonsel"
                placeholder="Nomor Ponsel"
                keyboardType="phone-pad"
                returnKeyType="next"
                onChangeText={nomorPonsel => this.setState({ nomorPonsel })}
                value={this.state.nomorPonsel}
                onSubmitEditing={() => this.focusNextField('password')}
                blurOnSubmit={false}
              />
            </Item>
            {this.displayError('nomorPonsel')}
            <Item style={styles.formItem}>
              <Input
                ref="password"
                placeholder="Kata Sandi"
                autoCapitalize="none"
                returnKeyType="done"
                onChangeText={password => this.setState({ password })}
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
            {this.displayError('password')}
          </Form>
          {this.renderButtonOrSpinner()}
          <View style={styles.viewRules}>
            <Text style={styles.viewRulesText}>
              Dengan mendaftar, saya menyetujui{' '}
              <Text style={styles.textRule}>Syarat dan Ketentuan</Text>, serta{' '}
              <Text style={styles.textRule}>Kebijakan Privasi</Text>
            </Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
