import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  viewScrollContainer: {
    flexGrow: 1,
    flexBasis: '100%',
    backgroundColor: colors.background
  },
  scrollViewContainer: {
    backgroundColor: colors.background,
    flexGrow: 1
  },
  scrollView: {
    paddingHorizontal: 15
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 25,
    borderRadius: 3
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: `${colors.dark}11`,
    marginBottom: 10
  },
  nama: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.dark
  },
  harga: {
    color: colors.success,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  penjual: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  iconPerson: {
    marginRight: 5
  },
  btnBeli: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 20
  },
  btnBeliText: {
    color: colors.light,
    fontWeight: 'bold'
  }
});
