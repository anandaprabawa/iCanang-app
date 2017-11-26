import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

export default StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flex: 1
  },
  viewMapViewContainer: {
    display: 'flex',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
