import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const spinnerColor = colors.primary;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%'
  },
  view: {
    padding: 15
  },
  textInput: {
    borderWidth: 1,
    borderColor: `${colors.dark}33`,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 30,
    marginBottom: 5
  },
  errorText: {
    color: colors.danger
  },
  successText: {
    color: colors.success,
    alignSelf: 'center'
  },
  viewBtn: {
    alignItems: 'center'
  },
  btn: {
    backgroundColor: colors.primary,
    marginVertical: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 100,
    alignItems: 'center'
  },
  btnText: {
    color: colors.light,
    fontWeight: 'bold'
  },
  spinner: {
    marginVertical: 30
  }
});
