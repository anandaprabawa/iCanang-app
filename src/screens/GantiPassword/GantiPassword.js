import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native';
import styles, { spinnerColor } from './styles';

import Header from 'components/HeaderBack';
import Modal from './ModalReauth';

export default class GantiPassword extends Component {
  constructor() {
    super();
    this.state = {
      kataSandi: null,
      KonfirmasiKataSandi: null,
      errMessage: null,
      sucMessage: null,
      loading: false,
      visible: false,
      email: null,
      password: null,
      user: firebase.auth().currentUser,
      loadingBtn: false
    };
  }

  onChangeEmail = text => {
    this.setState({ email: text });
  };

  onChangePassword = text => {
    this.setState({ password: text });
  };

  onKataSandi = text => {
    this.setState({ kataSandi: text });
  };

  onKonfirmasiKataSandi = text => {
    this.setState({ KonfirmasiKataSandi: text });
  };

  onSubmit = async () => {
    if (
      this.state.kataSandi &&
      this.state.kataSandi === this.state.KonfirmasiKataSandi
    ) {
      this.openModal();
    } else if (this.state.kataSandi !== this.state.KonfirmasiKataSandi) {
      this.showToast('Kata sandi tidak sesuai');
    } else {
      this.showToast('Kata sandi tidak boleh kosong');
    }
  };

  onPressReauth = async () => {
    if (this.state.email && this.state.password) {
      try {
        await this.setState({ loadingBtn: true });
        const credential = await firebase.auth.EmailAuthProvider.credential(
          this.state.email,
          this.state.password
        );
        await this.state.user.reauthenticateWithCredential(credential);
        await this.updatePassword();
        this.setState({
          kataSandi: null,
          KonfirmasiKataSandi: null,
          loadingBtn: false
        });
        this.closeModal();
        this.showToast('Password telah diupdate');
      } catch (error) {
        switch (error.code) {
          case 'auth/provider-already-linked':
            this.showToast('Provider already linked');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/invalid-credential':
            this.showToast('Invalid credential');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/credential-already-in-use':
            this.showToast('Credential already in use');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/email-already-in-use':
            this.showToast('Email already in use');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/operation-not-allowed':
            this.showToast('Operation not allowed');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/invalid-email':
            this.showToast('Invalid email');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/wrong-password':
            this.showToast('Wrong password');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/invalid-verification-code':
            this.showToast('Invalid verification code');
            this.setState({ loadingBtn: false });
            break;
          case 'auth/invalid-verification-id':
            this.showToast('Invalid verification id');
            this.setState({ loadingBtn: false });
            break;
          default:
            this.showToast('Input is empty');
            this.setState({ loadingBtn: false });
            break;
        }
      }
    } else if (!this.state.email && !this.state.password) {
      this.showToast('Email dan password can not be empty');
    } else if (!this.state.email && this.state.password) {
      this.showToast('Email can not be empty');
    } else if (this.state.email && !this.state.password) {
      this.showToast('Password can not be empty');
    }
  };

  async updatePassword() {
    try {
      await this.state.user.updatePassword(this.state.kataSandi);
    } catch (error) {
      switch (error.code) {
        case 'auth/weak-password':
          this.showToast('Password minimal 8 karakter');
          this.setState({ loadingBtn: false });
          break;
        case 'auth/requires-recent-login':
          this.showToast('Requires recent login');
          this.setState({ loadingBtn: false });
          break;
        case 'auth/invalid-verification-code':
          this.showToast('Invalid verification code');
          this.setState({ loadingBtn: false });
          break;
        case 'auth/invalid-verification-id':
          this.showToast('Invalid verification id');
          this.setState({ loadingBtn: false });
          break;
        default:
          this.showToast('Anda harus login');
          this.setState({ loadingBtn: false });
          break;
      }
    }
  }

  showToast = text => {
    ToastAndroid.showWithGravity(text, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  onNextFocus = text => {
    this.refs[text].focus();
  };

  openModal = () => {
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({ visible: false, toast: null });
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
            <Text style={styles.btnText}>GANTI</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={'Ganti Kata Sandi'} navigation={this.props.navigation} />
        <View style={styles.view}>
          <View style={styles.viewTextInput}>
            <TextInput
              placeholder={'Kata sandi baru'}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              autoCapitalize={'none'}
              onChangeText={this.onKataSandi}
              value={this.state.kataSandi}
              onSubmitEditing={() => this.onNextFocus('konfirm')}
              blurOnSubmit={false}
              returnKeyType={'next'}
            />
            <TextInput
              ref={'konfirm'}
              placeholder={'Konfirmasi kata sandi baru'}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              autoCapitalize={'none'}
              onChangeText={this.onKonfirmasiKataSandi}
              value={this.state.KonfirmasiKataSandi}
            />
          </View>
          {this.state.errMessage && (
            <Text style={styles.errorText}>{this.state.errMessage}</Text>
          )}
          {this.state.sucMessage && (
            <Text style={styles.successText}>{this.state.sucMessage}</Text>
          )}
          {!this.state.loading && this.renderButton()}
          {this.state.loading && this.renderSpinner()}
        </View>
        <Modal
          visible={this.state.visible}
          closeModal={this.closeModal}
          onChangeEmail={this.onChangeEmail}
          onChangePassword={this.onChangePassword}
          onPressReauth={this.onPressReauth}
          loadingBtn={this.state.loadingBtn}
        />
      </View>
    );
  }
}
