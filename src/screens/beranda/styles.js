import { StyleSheet } from 'react-native';
import { colors } from '../../styles/variables';

const styles = StyleSheet.create({
  scrollView: {
    padding: 10
  },
  card: {
    borderRadius: 3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    paddingBottom: 30,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  cardItem: {
    backgroundColor: 'transparent'
  },
  cardItemImage: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  cardContentInfo: {
    flexDirection: 'column'
  },
  cardTitle: {
    marginBottom: 5,
    fontSize: 14,
    color: `${colors.dark}dd`
  },
  cardInfoHarga: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.success
  },
  cardInfoLocation: {
    flexDirection: 'row',
    alignItems: 'center'
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
  cardItemBeli: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    position: 'absolute',
    bottom: 0
  },
  buttonBeli: {
    flex: 1,
    height: 30,
    borderRadius: 0,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingTop: 0,
    paddingBottom: 0
  }
});

export default styles;
