import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/variables';

export const headerTintColor = colors.light;

export default (styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  markerCallout: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  }
}));
