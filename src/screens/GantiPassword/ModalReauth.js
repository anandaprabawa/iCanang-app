import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import { colors } from 'styles';

export default class ModalReauth extends Component {
  onNextFocus = ref => {
    this.refs[ref].focus();
  };

  render() {
    const {
      visible,
      closeModal,
      onChangeEmail,
      onChangePassword,
      onPressReauth
    } = this.props;

    return (
      <Modal
        animationType={'fade'}
        visible={visible}
        onRequestClose={closeModal}
      >
        <View style={styles.container}>
          <View style={styles.viewTextInput}>
            <TextInput
              placeholder={'Email'}
              style={styles.textInput}
              onChangeText={onChangeEmail}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              returnKeyType={'next'}
              onSubmitEditing={() => this.onNextFocus('kataSandi')}
              blurOnSubmit={false}
            />
            <TextInput
              ref="kataSandi"
              placeholder={'Kata sandi'}
              style={styles.textInput}
              onChangeText={onChangePassword}
            />
            <View style={styles.btn}>
              <TouchableNativeFeedback onPress={onPressReauth}>
                <View style={styles.viewBtn}>
                  <Text style={styles.textBtn}>SUBMIT</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  viewTextInput: {
    marginHorizontal: 15
  },
  textInput: {
    borderWidth: 1,
    borderColor: `${colors.dark}33`,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  btn: {
    alignItems: 'center'
  },
  viewBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  textBtn: {
    color: colors.light,
    fontWeight: 'bold'
  }
});
