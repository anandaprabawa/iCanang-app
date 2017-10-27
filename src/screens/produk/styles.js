import { StyleSheet } from 'react-native';
import { colors } from '../../styles/variables';

const styles = StyleSheet.create({
  btnIcon: {
    color: colors.primary
  },
  btnText: {
    color: colors.primary
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
    marginRight: 5,
    color: `${colors.dark}aa`
  },
  cardLocationText: {
    fontSize: 14,
    color: `${colors.dark}aa`
  },
  viewOpsi: {
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
    paddingTop: 0,
    paddingBottom: 0
  },
  btnEditText: {
    color: colors.primary
  },
  iconDelete: {
    color: colors.danger
  }
});

export default styles;
