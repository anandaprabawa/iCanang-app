import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator
} from 'react-native';
import styles, { spinnerColor } from './styles';

import Header from 'components/HeaderBack';

export default class LupaPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      errMessage: null,
      sucMessage: null,
      loading: false
    };
  }

  onChangeText = text => {
    this.setState({ email: text });
  };

  onSubmit = async () => {
    this.setState({ loading: true, errMessage: null, sucMessage: null });
    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email);
      this.setState({ loading: false, sucMessage: 'Berhasil' });
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.setState({ errMessage: 'Email salah', loading: false });
          break;
        case 'auth/user-not-found':
          this.setState({ errMessage: 'User tidak ditemukan', loading: false });
          break;
        default:
          this.setState({ errMessage: 'Email salah', loading: false });
          break;
      }
    }
  };

  renderSpinner() {
    return (
      <ActivityIndicator
        size={'large'}
        color={spinnerColor}
        style={styles.spinner}
      />
    );
  }

  renderButton() {
    return (
      <View style={styles.viewBtn}>
        <TouchableNativeFeedback onPress={this.onSubmit}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>KIRIM</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="" navigation={this.props.navigation} />
        <View style={styles.view}>
          <TextInput
            placeholder={'Email'}
            underlineColorAndroid={'transparent'}
            style={styles.textInput}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            onChangeText={this.onChangeText}
          />
          {this.state.errMessage && (
            <Text style={styles.errorText}>{this.state.errMessage}</Text>
          )}
          {this.state.sucMessage && (
            <Text style={styles.successText}>{this.state.sucMessage}</Text>
          )}
          {!this.state.loading && this.renderButton()}
          {this.state.loading && this.renderSpinner()}
        </View>
      </View>
    );
  }
}
