import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

export const spinnerColor = colors.primary;

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
  flatList: {
    backgroundColor: colors.background
  },
  cardContainer: {
    width: '50%',
    padding: 12,
    borderWidth: 0.17,
    borderColor: `${colors.dark}33`,
    backgroundColor: colors.light
  },
  cardViewImage: {
    marginBottom: 5
  },
  cardImage: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 2
  },
  cardTitle: {
    marginBottom: 3,
    fontSize: 14,
    color: `${colors.dark}dd`
  },
  cardHarga: {
    fontSize: 15,
    marginBottom: 3,
    fontWeight: 'bold',
    color: colors.success
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  cardLocationPin: {
    fontSize: 14,
    marginRight: 5,
    color: `${colors.dark}aa`
  },
  cardLocationText: {
    fontSize: 14,
    color: `${colors.dark}aa`
  },
  btnBeli: {
    marginTop: 'auto',
    height: 28,
    borderRadius: 2,
    borderColor: colors.primary,
    paddingTop: 0,
    paddingBottom: 0
  },
  btnBeliText: {
    color: colors.primary
  },
  loadingInfiniteScroll: {
    marginVertical: 10
  }
});

export default styles;
