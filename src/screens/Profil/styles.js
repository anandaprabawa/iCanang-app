import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

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
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 5
  },
  addPhotoIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: `${colors.dark}55`,
    borderRadius: 100,
    padding: 5
  },
  form: {
    paddingHorizontal: 15
  },
  formItem: {
    marginLeft: 0,
    marginTop: 15
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
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 5,
    color: `${colors.dark}cc`
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
  }
});
