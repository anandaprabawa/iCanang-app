import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

export const spinnerColor = colors.primary;
export const underlayColor = colors.secondary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  viewBackground: {
    backgroundColor: colors.background
  },
  viewBtnPenjual: {
    backgroundColor: colors.light,
    marginBottom: 10,
    borderBottomWidth: 0.17,
    borderBottomColor: `${colors.dark}33`
  },
  btnPenjualTerdekat: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: colors.primary
  },
  btnIcon: {
    color: colors.primary
  },
  btnText: {
    color: colors.primary
  },
  loadingInfiniteScroll: {
    marginVertical: 10
  }
});

export default styles;
