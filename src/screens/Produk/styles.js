import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const spinnerColor = colors.primary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
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
    marginBottom: 8,
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
  viewOpsi: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnEdit: {
    flexGrow: 1,
    justifyContent: 'center',
    marginRight: 5,
    height: 30,
    borderRadius: 2,
    borderColor: colors.secondary,
    paddingTop: 0,
    paddingBottom: 0
  },
  btnDelete: {
    height: 30,
    borderRadius: 2,
    borderColor: colors.danger,
    paddingVertical: 0,
    paddingHorizontal: 10
  },
  btnEditText: {
    color: colors.primary
  },
  iconDelete: {
    marginLeft: 0,
    color: colors.danger
  },
  fabBtn: {
    backgroundColor: colors.primary
  },
  loadingInitData: {
    marginTop: 30
  },
  viewNoProduct: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
