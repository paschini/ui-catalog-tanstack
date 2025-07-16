import { useContext, useEffect, useState, startTransition, Suspense } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { DeviceData } from './DeviceDataTypes.ts';
import ImageLoader from '../components/ImageLoader';
import { GlobalContext } from '../globalContext';
import styles from './DeviceList.module.css';
import Img from '../assets/icons/Img';

type DeviceListProps = {
  data: DeviceData[];
};

const DeviceList = (props: DeviceListProps) => {
  const { data } = props;
  const iconSize = 20;

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
        setDevices(data);
      }
    });
  }, [data, filteredDeviceList]);

  return (
    <div className={styles.table}>
      <div className={styles.tableHeaders}>
        <div className={styles.tableRow}>
          <span>&nbsp;</span>
          <span>Product Line</span>
          <span>Name</span>
        </div>
      </div>

      <div className={styles.tableContent}>
        {devices.map((device) => (
          <div
            className={styles.tableRow}
            key={`device-${device.id}`}
            onClick={() => {
              navigate({ to: `/details/${device.id}` });
            }}
          >
            <Suspense fallback={<Img width={'33px'} height={'33px'} />}>
              <ImageLoader
                src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${iconSize}&q=75`}
                alt={`icon for ${device.product.name} ${device.line.name}`}
              />
            </Suspense>

            <span>{device.line.name}</span>
            <span>{device.product.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
