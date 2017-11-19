import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const placeholderColor = colors.dark;

export default StyleSheet.create({
  viewImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  image: {
    width: 200,
    height: 200
  },
  btnUpload: {
    borderColor: colors.primary,
    marginHorizontal: 15
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
    marginHorizontal: 15
  }
});
