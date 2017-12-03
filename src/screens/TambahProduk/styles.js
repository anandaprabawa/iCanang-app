import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

export const placeholderColor = colors.dark;
export const iconCancelColor = `${colors.light}aa`;
export const spinnerColor = colors.primary;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  viewImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 20,
    position: 'relative'
  },
  image: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').width - 30,
    borderRadius: 3
  },
  btnUpload: {
    borderColor: colors.primary,
    marginHorizontal: 15,
    marginTop: 10
  },
  btnUploadIcon: {
    color: colors.primary
  },
  btnUplaodText: {
    color: colors.primary
  },
  formItem: {
    marginRight: 15,
    marginTop: 15,
    marginBottom: 5
  },
  textHeaderPicker: {
    marginTop: 25,
    marginHorizontal: 20
  },
  picker: {
    marginBottom: 25,
    marginHorizontal: 13
  },
  btnSimpan: {
    backgroundColor: colors.primary,
    marginBottom: 50,
    marginHorizontal: 15,
    elevation: 0,
    marginTop: 50
  },
  viewIconCancel: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 5
  },
  viewSpinner: {
    marginBottom: 50,
    marginTop: 50
  },
  errorMsg: {
    color: colors.danger,
    fontSize: 13,
    paddingHorizontal: 20
  },
  errorMsgImage: {
    color: colors.danger,
    fontSize: 13,
    paddingHorizontal: 15
  }
});
