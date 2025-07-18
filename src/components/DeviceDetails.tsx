import { Suspense, useMemo } from 'react';
import Img from '../assets/icons/Img';
import ImageLoader from '../components/ImageLoader';
import styles from './DeviceDetails.module.css';

import { DeviceData } from './DeviceDataTypes';

type DeviceDetailsProps = {
  device: DeviceData;
};

const DeviceDetails = (props: DeviceDetailsProps) => {
  const iconSize = '292';

  const { device } = props;

  const imageUrl = useMemo(
    () =>
      `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id || ''}%2Fdefault%2F${device.images.default || ''}.png&w=${iconSize}&q=75`,
    [device.id, device.images.default, iconSize]
  );

  return (
    <div className={styles.detailsContainer}>
      <Suspense fallback={<Img width={iconSize} height={iconSize} />}>
        <ImageLoader
          src={imageUrl}
          alt={`icon for ${device.product.name} ${device.line.name}`}
          width={iconSize}
          height={iconSize}
        />
      </Suspense>
      <div className={styles.infoContainer}>
        <div className={`${styles.text} ${styles.title}`}>{device.product.name}</div>
        <div className={`${styles.text} ${styles.subTitle}`}>{device.line.name}</div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>Product Line</span>
          <span className={`${styles.names} ${styles.text}`}>{device.line.name}</span>
        </div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>ID</span>
          <span className={`${styles.names} ${styles.text}`}>{device.id}</span>
        </div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>Name</span>
          <span className={`${styles.names} ${styles.text}`}>{device.product.name}</span>
        </div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>Shortname</span>
          <span className={`${styles.names} ${styles.text}`}>{device.shortnames[0]}</span>
        </div>

        {device.unifi?.network?.radios?.ng && (
          <div className={styles.infoBlock}>
            <span className={styles.callers}>MaxPower</span>
            <span className={`${styles.names} ${styles.text}`}>{`${device.unifi.network.radios.ng.maxPower} W`}</span>
          </div>
        )}

        {device.unifi?.network && (
          <div className={styles.infoBlock}>
            <span className={styles.callers}>Number of Ports</span>
            <span className={`${styles.names} ${styles.text}`}>{device.unifi.network.numberOfPorts}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDetails;
