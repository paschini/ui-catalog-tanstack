import { useContext, useState } from 'react';
import { GlobalContext } from '../globalContext';
import DataVersion from './DataVersion';
import DeviceList from './DeviceList';
import Errors from './Errors';
import styles from './Main.module.css';

import type { Data } from './DeviceDataTypes';

type MainProps = {
  data: Data;
};

const Main = (props: MainProps) => {
  const { data } = props;
  // const DeviceDetails = lazy(() => import('./DeviceDetails'));

  const [isShowingNotification, setIsShowingNotification] = useState(false);

  const {
    globalState: { errors },
    globalDispatch
  } = useContext(GlobalContext);

  return (
    <div className={styles.main}>
      {isShowingNotification && (
        <div className={styles.notificationArea}>
          <DataVersion version={data?.version} />
          <Errors />
        </div>
      )}
      <div className={styles.contentArea}>
        <DeviceList data={data.devices} />
      </div>
    </div>
  );
};

export default Main;
