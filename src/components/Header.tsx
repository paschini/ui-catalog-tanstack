import UDefault from '../assets/icons/UDefault';
import styles from './Header.module.css';

const Header = () => {
  // const { globalDispatch } = useContext(GlobalContext);

  //FIXME: activeView ---> becomes routes

  return (
    <div
      className={styles.headerContainer}
      onClick={() => {
        // globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'list' });
        // globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: [] });
        // globalDispatch({ type: 'SET_FILTERED_DEVICE_LIST', payload: [] });
      }}
    >
      <UDefault className={styles.pointer} />
      <span className={styles.breadcrumbs}>Devices</span>
      <span className={styles.author}>Author/Camila Paschini</span>
    </div>
  );
};

export default Header;
