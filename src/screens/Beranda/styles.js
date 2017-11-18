import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const rippleColor = colors.primary;

export default StyleSheet.create({
  container: {
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
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 3,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7
  },
  btnIcon: {
    color: colors.primary,
    fontSize: 26
  },
  btnText: {
    color: colors.primary,
    fontWeight: 'bold'
  },
  flatList: {
    backgroundColor: colors.light
  },
  cardContainer: {
    flex: 1,
    padding: 12,
    borderWidth: 0.17,
    borderColor: `${colors.dark}33`
  },
  cardViewImage: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
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
    marginRight: 3,
    color: `${colors.dark}aa`
  },
  cardLocationText: {
    fontSize: 14,
    color: `${colors.dark}aa`
  },
  btnBeli: {
    display: 'flex',
    flex: 1,
    borderRadius: 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  btnBeliText: {
    color: colors.light,
    fontFamily: 'Roboto_medium'
  }
});
