import { useNavigate } from '@tanstack/react-router';
import Button from '../uiComponents/Button';
import ArrowLeftPrimary from '../assets/icons/ArrowLeftPrimary';
import ArrowRightPrimary from '../assets/icons/ArrowRightPrimary';
import styles from './DetailsMenu.module.css';
import { useContext } from 'react';
import { GlobalContext } from '../globalContext';

const DetailsMenu = () => {
  const navigate = useNavigate();

  const {
    globalState: { deviceList, activeDeviceIndex }
  } = useContext(GlobalContext);

  const nextDeviceId = deviceList[activeDeviceIndex + 1].id;
  const prevDeviceId = deviceList[activeDeviceIndex - 1].id;

  return (
    <div className={styles.menuContainer}>
      <div className={styles.leftContainer}>
        <Button
          onClick={() => {
            navigate({ to: '/' });
          }}
          type={'shadowed'}
          disabled={activeDeviceIndex === 0}
        >
          <div className={styles.iconPlacement}>
            <ArrowLeftPrimary />
            <span className={styles.buttonTextPlacement}>Back</span>
          </div>
        </Button>
      </div>

      <div className={styles.rightContainer}>
        <Button
          onClick={() => {
            navigate({ to: `/details/${prevDeviceId}` });
          }}
          type={'shadowed'}
        >
          <div className={styles.iconPlacement}>
            <ArrowLeftPrimary />
          </div>
        </Button>

        <Button
          onClick={() => {
            navigate({ to: `/details/${nextDeviceId}` });
          }}
          type={'shadowed'}
          disabled={activeDeviceIndex === deviceList.length - 1}
        >
          <div className={styles.iconPlacement}>
            <ArrowRightPrimary />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DetailsMenu;
