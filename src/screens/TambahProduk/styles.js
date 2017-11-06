import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const headerTintColor = colors.light;

export default (styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary
  },
  contentStyle: {
    padding: 15
  },
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
    borderColor: colors.primary
  },
  btnUploadIcon: {
    color: colors.primary
  },
  btnUplaodText: {
    color: colors.primary
  },
  formItem: {
    marginLeft: 0
  },
  textHeaderPicker: {
    marginTop: 40
  },
  picker: {
    marginBottom: 25
  },
  btnSimpan: {
    backgroundColor: colors.primary,
    marginBottom: 50
  }
}));
