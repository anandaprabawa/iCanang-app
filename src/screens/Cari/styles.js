import { StyleSheet } from 'react-native';
import { colors } from 'styles';

export const pressColor = colors.primary;

export default StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.background
  },
  tabViewAnimated: {
    flex: 1
  },
  tabBar: {
    backgroundColor: colors.primary
  },
  tabBarIndicator: {
    backgroundColor: colors.light
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  tabBarIndividu: {
    paddingTop: 0,
    paddingBottom: 7
  }
});
