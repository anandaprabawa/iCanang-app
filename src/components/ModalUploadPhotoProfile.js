import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions
} from 'react-native';

import { colors } from 'styles';

export default ({ visible, modalHide }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={modalHide}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={modalHide}>
          <View style={styles.viewOuter} />
        </TouchableWithoutFeedback>
        <View style={styles.viewInner}>
          <TouchableNativeFeedback>
            <View>
              <Text style={styles.text}>Kamera</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View>
              <Text style={styles.text}>Pilih foto</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View>
              <Text style={styles.text}>Hapus</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewOuter: {
    flex: 1,
    backgroundColor: `${colors.dark}99`,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  viewInner: {
    backgroundColor: colors.light,
    width: '70%',
    paddingVertical: 5,
    elevation: 3,
    borderRadius: 1
  },
  text: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    fontSize: 16,
    color: colors.dark
  }
});
