import { startTransition, Suspense, useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { DeviceData } from './DeviceDataTypes.ts';
import ImageLoader from '../components/ImageLoader';
import Img from '../assets/icons/Img';
import { GlobalContext } from '../globalContext';
import styles from './DeviceGrid.module.css';

type DeviceGridProps = {
  data: DeviceData[];
};

const DeviceGrid = (props: DeviceGridProps) => {
  const { data } = props;
  const iconSize = 84;

  const {
    globalState: { filteredDeviceList }
  } = useContext(GlobalContext);

  const [devices, setDevices] = useState<DeviceData[]>(data);

  const navigate = useNavigate();

  useEffect(() => {
    startTransition(() => {
      if (filteredDeviceList.length > 0) {
        setDevices(filteredDeviceList);
      } else {
        setDevices(data); // Fixat: använd data istället för devices
      }
    });
  }, [data, filteredDeviceList]);

  // Memoize image URLs för att undvika onödiga re-renders
  const devicesWithImageUrls = useMemo(() => {
    return devices.map((device) => ({
      ...device,
      imageUrl: `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${iconSize}&q=75`
    }));
  }, [devices, iconSize]);

  return (
    <div className={styles.table}>
      <div className={styles.tableContent}>
        <div className={styles.tableRow}>
          {devicesWithImageUrls.map((device) => (
            <div
              key={`device-${device.id}`}
              className={styles.tableCell}
              onClick={() => {
                navigate({ to: `/details/${device.id}` });
              }}
            >
              {device.line.name === 'UniFi' && (
                <div className={styles.unifiTag}>
                  <div className={styles.unifiTagText}>UniFi</div>
                </div>
              )}
              <Suspense fallback={<Img width={'84px'} height={'84px'} />}>
                <ImageLoader
                  src={device.imageUrl}
                  alt={`icon for ${device.product.name} ${device.line.name}`}
                  width={'84px'}
                  height={'84px'}
                  lazy={true}
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
