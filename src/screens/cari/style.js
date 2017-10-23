import { StyleSheet } from 'react-native';
import { colors } from '../../styles/variables';

// cari header
export const headerStyle = {
  backgroundColor: colors.primary,
  elevation: 0
};
export const headerTitleStyle = {
  color: colors.light
};
export const headerBackTitleStyle = {
  color: colors.light
};
export const headerTintColor = colors.light;
export const placeholderTextColor = `${colors.dark}cc`;

export default (styles = StyleSheet.create({
  viewInput: {
    width: '100%',
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexGrow: 1
  },
  item: {
    backgroundColor: colors.light,
    borderRadius: 3,
    flex: 1
  },
  icon: {
    marginLeft: 10,
    color: `${colors.dark}cc`
  },
  input: {
    color: `${colors.dark}cc`,
    flex: 1,
    fontSize: 14
  },
  tabBarStyle: {
    backgroundColor: colors.primary
  },
  tabBarIncidator: {
    backgroundColor: colors.light
  },
  tabBarLabelStyle: {
    fontWeight: 'bold'
  }
}));
