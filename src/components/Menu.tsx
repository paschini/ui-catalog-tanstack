import { useContext } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import SearchInput from './SearchInput';
import Count from '../uiComponents/Count';
import ListView from '../assets/icons/ListView';
import GridView from '../assets/icons/GridView';
import Filter from './Filter';
import { GlobalContext } from '@/globalContext';
import styles from './Menu.module.css';

const Menu = () => {
  const {
    globalState: { deviceList, filteredDeviceList }
  } = useContext(GlobalContext);

  const location = useLocation();

  return (
    <div className={styles.menuContainer}>
      <div className={styles.leftContainer} style={{ width: '60%' }}>
        <SearchInput />
        <Count total={filteredDeviceList.length > 0 ? filteredDeviceList.length : deviceList.length} />
      </div>
      <div className={styles.rightContainer}>
        <Link to={'/'}>
          <ListView className={styles.iconPlacement} isActive={location.pathname === '/'} />
        </Link>

        <Link to={'/grid'}>
          <GridView className={styles.iconPlacement} isActive={location.pathname === '/grid'} />
        </Link>
        <Filter />
      </div>
    </div>
  );
};

export default Menu;
