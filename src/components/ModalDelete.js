import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'styles';

const deleteDocFirebase = async doc => {
  await firebase
    .firestore()
    .collection('products')
    .doc(doc)
    .delete();
};

export default ({ visibleModal, hideModal, deleteDoc }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleModal}
      onRequestClose={() => {
        this.setModalVisible(false);
      }}
    >
      <View style={styles.viewContainer}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.viewOuter} />
        </TouchableWithoutFeedback>
        <View style={styles.viewInner}>
          <Text style={styles.textHapusProduk}>Hapus Produk?</Text>
          <View style={styles.viewIcon}>
            <Icon name="delete-forever" size={100} color={`${colors.dark}33`} />
          </View>
          <View style={styles.opsi}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.SelectableBackground()}
              onPress={deleteDoc}
            >
              <View style={styles.viewBtnYa}>
                <Text style={[styles.btnText, { color: colors.light }]}>
                  YA
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.SelectableBackground()}
              onPress={hideModal}
            >
              <View style={styles.viewBtnBatal}>
                <Text style={[styles.btnText, { color: colors.dark }]}>
                  BATAL
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewOuter: {
    backgroundColor: `${colors.dark}ee`,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  viewInner: {
    backgroundColor: colors.light,
    width: Dimensions.get('window').width - 50,
    borderRadius: 3,
    elevation: 5,
    padding: 15
  },
  textHapusProduk: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.dark
  },
  viewIcon: {
    alignSelf: 'center',
    marginVertical: 15
  },
  opsi: {
    display: 'flex',
    flexDirection: 'row'
  },
  viewBtnYa: {
    backgroundColor: colors.danger,
    flex: 1,
    height: 40,
    marginRight: 7.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewBtnBatal: {
    backgroundColor: colors.light,
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: `${colors.dark}aa`,
    marginLeft: 7.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
