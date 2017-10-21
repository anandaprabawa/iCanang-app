import { StyleSheet } from 'react-native';
import { colors } from '../../styles/variables';

const styles = StyleSheet.create({
  formItem: {
    marginRight: 15
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
    marginRight: 15
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
  }
});

export default styles;
