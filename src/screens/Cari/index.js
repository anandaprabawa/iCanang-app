import { TabNavigator } from 'react-navigation';
import styles, { inactiveBackgroundColor } from './style';
import ProdukTab from './ProdukTab';
import PenjualTab from './PenjualTab';
import HeaderNavigation from './Cari';

export const headerNavigationOptions = HeaderNavigation;

const tabs = TabNavigator(
  {
    Produk: { screen: ProdukTab },
    Penjual: { screen: PenjualTab }
  },
  {
    tabBarOptions: {
      style: styles.tabBarStyle,
      indicatorStyle: styles.tabBarIncidator,
      labelStyle: styles.tabBarLabelStyle
    },
    backBehavior: 'none'
  }
);

export default tabs;
