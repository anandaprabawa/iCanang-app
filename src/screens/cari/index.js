import { TabNavigator } from 'react-navigation';
import styles, { inactiveBackgroundColor } from './style';
import ProdukTab from './produkTab';
import PenjualTab from './penjualTab';
import HeaderNavigation from './cari';

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
    }
  }
);

export default tabs;
