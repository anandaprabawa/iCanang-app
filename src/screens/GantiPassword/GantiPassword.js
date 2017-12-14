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
      user: firebase.auth().currentUser
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
    this.openModal();
    // if (this.state.email && this.state.password) {
    //   const credential = await firebase.auth.EmailAuthProvider.credential(
    //     this.state.email,
    //     this.state.password
    //   );
    //   console.log(credential);
    //   const reauth = await user.reauthenticateWithCredential(credential);
    //   console.log(reauth);
    // }
    // this.setState({ loading: true, errMessage: null, sucMessage: null });
    // const { kataSandi, KonfirmasiKataSandi } = this.state;
    // if (kataSandi === KonfirmasiKataSandi) {
    //   const user = await firebase.auth().currentUser;

    //   try {
    //     await firebase.auth().currentUser.updatePassword(this.state.kataSandi);
    //     this.setState({ loading: false, sucMessage: 'Berhasil' });
    //   } catch (error) {
    //     console.log(error);
    //     switch (error.code) {
    //       case 'auth/weak-password':
    //         this.setState({ errMessage: 'Kata sandi lemah', loading: false });
    //         break;
    //       case 'auth/requires-recent-login':
    //         this.setState({ errMessage: 'Harus login', loading: false });
    //         break;
    //       case 'auth/invalid-verification-code':
    //         this.setState({
    //           errMessage: 'Invalid verification code',
    //           loading: false
    //         });
    //         break;
    //       case 'auth/invalid-verification-id':
    //         this.setState({
    //           errMessage: 'Invalid verification id',
    //           loading: false
    //         });
    //         break;
    //       default:
    //         this.setState({ errMessage: 'Kata sandi salah', loading: false });
    //         break;
    //     }
    //   }
    // } else {
    //   this.setState({ loading: false });
    //   alert('kata sandi tidak cocok');
    // }
  };

  onPressReauth = async () => {
    if (this.state.email && this.state.password) {
      try {
        const credential = await firebase.auth.EmailAuthProvider.credential(
          this.state.email,
          this.state.password
        );
        await this.state.user.reauthenticateWithCredential(credential);
      } catch (error) {
        switch (error.code) {
          case 'auth/provider-already-linked':
            this.showToast('Provider already linked');
            break;
          case 'auth/invalid-credential':
            this.showToast('Invalid credential');
            break;
          case 'auth/credential-already-in-use':
            this.showToast('Credential already in use');
            break;
          case 'auth/email-already-in-use':
            this.showToast('Email already in use');
            break;
          case 'auth/operation-not-allowed':
            this.showToast('Operation not allowed');
            break;
          case 'auth/invalid-email':
            this.showToast('Invalid email');
            break;
          case 'auth/wrong-password':
            this.showToast('Wrong password');
            break;
          case 'auth/invalid-verification-code':
            this.showToast('Invalid verification code');
            break;
          case 'auth/invalid-verification-id':
            this.showToast('Invalid verification id');
            break;
          default:
            this.showToast('Input is empty');
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

  showToast = text => {
    ToastAndroid.showWithGravity(text, ToastAndroid.LONG, ToastAndroid.CENTER);
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
            />
            <TextInput
              placeholder={'Konfirmasi kata sandi baru'}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              autoCapitalize={'none'}
              onChangeText={this.onKonfirmasiKataSandi}
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
        />
      </View>
    );
  }
}
