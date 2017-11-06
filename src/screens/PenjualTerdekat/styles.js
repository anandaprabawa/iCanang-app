import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

export const headerTintColor = colors.light;

export const pinColor = colors.primary;

export default (styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  markerCalloutContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
    maxWidth: 250
  },
  markerCalloutContent: {
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  markerCalloutTriangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderRightWidth: 15,
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.secondary
  },
  calloutImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 100,
    borderColor: colors.light,
    borderWidth: 2
  },
  name: {
    textAlign: 'center',
    marginTop: 3,
    color: colors.light,
    fontWeight: 'bold'
  }
}));
