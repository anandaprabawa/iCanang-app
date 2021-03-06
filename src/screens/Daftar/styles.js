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
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: colors.primary,
    elevation: 0
  },
  btnText: {
    fontWeight: 'bold'
  },
  viewRules: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30
  },
  viewRulesText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: `${colors.dark}aa`,
    lineHeight: 22
  },
  textRule: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
    textDecorationLine: 'underline'
  },
  iconDisplayPass: {
    paddingLeft: 10
  },
  viewSpinner: {
    marginTop: 40,
    marginBottom: 20
  },
  displayError: {
    fontSize: 13,
    color: colors.danger,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 5
  }
});
