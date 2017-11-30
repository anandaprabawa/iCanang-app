import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export default StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.background
  },
  viewLogo: {
    paddingHorizontal: 15,
    backgroundColor: `${colors.dark}11`,
    alignItems: 'flex-end'
  },
  logo: {
    width: 100,
    height: 25
  }
});
