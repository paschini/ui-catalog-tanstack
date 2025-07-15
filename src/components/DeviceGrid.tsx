import { startTransition, Suspense, useContext, useEffect, useState } from 'react';
import type { DeviceData } from './DeviceDataTypes.ts';
import ImageLoader from '../components/ImageLoader';
import Img from '../assets/icons/Img';
import { GlobalContext } from '../globalContext';
import styles from './DeviceGrid.module.css';

type DeviceGridProps = {
  data: DeviceData[];
  // onSelectDevice: (index: number) => void;
};

const DeviceGrid = (props: DeviceGridProps) => {
  const { data } = props;
  const iconSize = 84;

  const {
    globalState: { deviceList, filteredDeviceList }
  } = useContext(GlobalContext);

  const [devices, setDevices] = useState<DeviceData[]>(data);

  useEffect(() => {
    startTransition(() => {
      if (filteredDeviceList.length > 0) {
        setDevices(filteredDeviceList);
      } else {
        setDevices(deviceList);
      }
    });
  }, [deviceList, filteredDeviceList]);

  return (
    <div className={styles.table}>
      <div className={styles.tableContent}>
        <div className={styles.tableRow}>
          {devices.map((device) => (
            <div
              key={`device-${device.id}`}
              className={styles.tableCell}
              // onClick={() => onSelectDevice(deviceList.indexOf(device))}
              onClick={() => console.log(device)}
            >
              {device.line.name === 'UniFi' && (
                <div className={styles.unifiTag}>
                  <div className={styles.unifiTagText}>UniFi</div>
                </div>
              )}
              <Suspense fallback={<Img />}>
                <ImageLoader
                  src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${iconSize}&q=75`}
                  alt={`icon for ${device.product.name} ${device.line.name}`}
                />
              </Suspense>

              <div className={styles.tableCellInfo}>
                <div className={styles.text}>{device.product.name}</div>
                <div className={`${styles.text} ${styles.abbrev}`}>{device.product.abbrev}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceGrid;
