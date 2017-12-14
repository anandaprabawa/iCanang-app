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
import {
  TextInput,
  ActivityIndicator,
  ScrollView,
  ToastAndroid
} from 'react-native';
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

  checkInput() {
    const errors = {
      email: null,
      password: null
    };
    if (!this.state.email) errors.email = 'Email harus diisi';
    if (!this.state.password) errors.password = 'Password harus diisi';

    if (this.state.email && this.state.password) return false;
    else return errors;
  }

  displayError(input) {
    const errors = this.checkInput();
    if (this.state.displayError && errors.email && input === 'email') {
      return <Text style={styles.displayError}>{errors.email}</Text>;
    }
    if (this.state.displayError && this.state.errorEmail && input === 'email') {
      return <Text style={styles.displayError}>{this.state.errorEmail}</Text>;
    }
    if (this.state.displayError && errors.password && input === 'password') {
      return <Text style={styles.displayError}>{errors.password}</Text>;
    }
    if (
      this.state.displayError &&
      this.state.errorPassword &&
      input === 'password'
    ) {
      return (
        <Text style={styles.displayError}>{this.state.errorPassword}</Text>
      );
    }
  }

  errorFirebase(error) {
    switch (error) {
      case 'auth/invalid-email':
        this.setState({ errorEmail: 'Format email salah' });
        break;
      case 'auth/user-not-found':
        this.setState({ errorEmail: 'Email tidak ditemukan' });
        break;
      case 'auth/wrong-password':
        this.setState({ errorPassword: 'Password salah' });
        break;
      case 'auth/unknown':
        this.showErrorUnknown();
        break;
      default:
        this.setState({ errorEmail: null, errorPassword: null });
        break;
    }
  }

  showErrorUnknown() {
    ToastAndroid.showWithGravityAndOffset(
      'Masuk gagal, silahkan ulangi!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      20
    );
  }

  onPressMasuk = () => {
    this.setState({ loading: true });
    if (this.checkInput()) {
      this.setState({ loading: false, displayError: true });
    } else {
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
        })
        .catch(error => {
          this.setState({ loading: false, displayError: true });
          this.errorFirebase(error.code);
        });
    }
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
      <Container style={styles.container}>
        <Header title="Masuk" navigation={this.props.navigation} />
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
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                onSubmitEditing={() => this.focusNextField('password')}
                blurOnSubmit={false}
              />
            </Item>
            {this.displayError('email')}
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
            {this.displayError('password')}
          </Form>
          {this.renderSpinnerOrButton()}
          <View style={styles.viewRules}>
            <Text
              style={styles.textLupaKataSandi}
              onPress={() => this.props.navigation.navigate('LupaPassword')}
            >
              Lupa kata sandi?
            </Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
