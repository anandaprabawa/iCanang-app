import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const spinnerColor = colors.primary;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  form: {
    marginTop: 15
  },
  formItem: {
    marginRight: 15,
    marginTop: 15,
    marginBottom: 5
  },
  buttonSubmit: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: colors.primary,
    elevation: 0
  },
  btnText: {
    fontWeight: 'bold'
  },
  viewRules: {
    marginLeft: 15,
    marginRight: 15
  },
  iconDisplayPass: {
    paddingLeft: 10
  },
  textLupaKataSandi: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.primary,
    textDecorationLine: 'underline'
  },
  viewSpinner: {
    marginTop: 25,
    marginBottom: 20
  }
});
