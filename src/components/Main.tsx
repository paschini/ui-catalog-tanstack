import { useContext, useState, useEffect, ReactElement } from 'react';
import { GlobalContext } from '../globalContext';
import DataVersion from './DataVersion';
import Errors from './Errors';
import styles from './Main.module.css';

type MainProps = {
  version: string;
  children: ReactElement;
};

const Main = (props: MainProps) => {
  const { version, children } = props;
  const {
    globalState: { errors }
  } = useContext(GlobalContext);
  const [isShowingNotification, setIsShowingNotification] = useState(errors.length > 0);

  useEffect(() => {
    setIsShowingNotification(errors.length > 0);
  }, [errors]);

  return (
    <div className={styles.main}>
      {isShowingNotification && (
        <div className={styles.notificationArea}>
          <DataVersion version={version} />
          <Errors />
        </div>
      )}
      <div className={styles.contentArea}>{children}</div>
    </div>
  );
};

export default Main;
