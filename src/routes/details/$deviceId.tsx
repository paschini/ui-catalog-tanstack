// src/routes/device/$deviceId.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../globalContext';
import RouteWrapper from '../../components/RouteWrapepr';
import DeviceDetails from '../../components/DeviceDetails';
import styles from '../layout.module.css';
import Header from '../../components/Header';
import DetailsMenu from '../../components/DetailsMenu';

export const Route = createFileRoute('/details/$deviceId')({
  component: DeviceDetailPage
});

function DeviceDetailPage() {
  const { deviceId } = Route.useParams();

  const {
    globalState: { deviceList, filteredDeviceList },
    globalDispatch
  } = useContext(GlobalContext);

  const currentDevice = deviceList.find((device) => device.id === deviceId);
  const currentDeviceIndex = deviceList.findIndex((device) => device.id === deviceId);

  useEffect(() => {
    if (currentDeviceIndex > -1) {
      globalDispatch({ type: 'SET_ACTIVE_DEVICE_INDEX', index: currentDeviceIndex });
    }
  }, [currentDeviceIndex, globalDispatch]);

  if (!currentDevice) {
    return <div>Device not found</div>;
  }

  return (
    <RouteWrapper styleModules={[styles]}>
      <div className={styles.layout}>
        <Header />
        <DetailsMenu />
        <DeviceDetails device={currentDevice} />
      </div>
    </RouteWrapper>
  );
}

// keyboard shortcuts?

// I DeviceDetail, lägg till:
// useEffect(() => {
//   const handleKeyPress = (e: KeyboardEvent) => {
//     if (e.key === 'ArrowLeft') handlePrevious();
//     if (e.key === 'ArrowRight') handleNext();
//   };
//
//   window.addEventListener('keydown', handleKeyPress);
//   return () => window.removeEventListener('keydown', handleKeyPress);
// }, [handlePrevious, handleNext]);
