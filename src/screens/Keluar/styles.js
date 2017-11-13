import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const spinnerColor = colors.light;

export default StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.primary,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: colors.light,
    marginBottom: 10
  }
});
