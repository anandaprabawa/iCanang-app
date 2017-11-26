import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

export const iconColor = colors.dark;
export const spinnerColor = colors.primary;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  viewImageContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
    marginBottom: 10
  },
  viewImage: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 500
  },
  addPhotoIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: colors.light,
    borderRadius: 100,
    padding: 6
  },
  form: {
    paddingHorizontal: 15
  },
  formItemContainer: {
    marginBottom: 15
  },
  formItem: {
    marginLeft: 0
  },
  itemInput: {
    paddingLeft: 0,
    paddingRight: 0
  },
  inputError: {
    color: colors.danger
  },
  viewTextGanti: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textGanti: {
    marginLeft: 5,
    marginTop: 3,
    color: colors.primary
  },
  mapViewContainer: {
    marginTop: 20
  },
  titleLokasiToko: {
    fontSize: 15,
    marginBottom: 10,
    color: `${colors.dark}88`
  },
  viewMapView: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: 230,
    backgroundColor: `${colors.dark}33`
  },
  mapView: {
    ...StyleSheet.absoluteFillObject
  },
  viewBtnSimpan: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 3,
    marginBottom: 50,
    marginTop: 30
  },
  btnSimpanText: {
    flex: 1,
    fontWeight: 'bold',
    color: colors.light
  },
  spinner: {
    marginBottom: 50,
    marginTop: 30
  }
});
