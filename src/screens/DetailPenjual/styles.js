import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

export const spinnerColor = colors.primary;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  viewUser: {
    backgroundColor: `${colors.light}ff`,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.light}aa`,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
    alignSelf: 'flex-start'
  },
  userText: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: 'bold'
  },
  userNomorPonsel: {
    color: `${colors.dark}aa`
  },
  viewProducts: {
    flexGrow: 1,
    height: Dimensions.get('window').height - 56 - 91 - 20
  },
  viewProdukDijual: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.quartenary
  },
  textProdukDijual: {
    fontWeight: 'bold',
    fontSize: 12
  },
  flatList: {},
  viewloadingData: {
    height: Dimensions.get('window').height - 56 - 91 - 20,
    justifyContent: 'center'
  }
});
