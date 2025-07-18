import { useContext, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Main from '../components/Main';
import DeviceList from '../components/DeviceList';
import RouteWrapper from '../components/RouteWrapepr';
import { useDeviceData } from '@/hooks/useDeviceData';
import { GlobalContext } from '@/globalContext';
import styles from './layout.module.css';

export const Route = createFileRoute('/')({
  component: Home
});

function Home() {
  const { globalDispatch } = useContext(GlobalContext);
  const { data, isLoading, error } = useDeviceData();

  useEffect(() => {
    if (data?.devices) {
      globalDispatch({ type: 'SET_DEVICE_LIST', payload: data.devices });
    }
  }, [data, globalDispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <RouteWrapper styleModules={[styles]}>
      <div className={styles.layout}>
        <Header />
        <Menu />
        <Main version={data?.version || ''}>
          <DeviceList data={data?.devices || []} />
        </Main>
      </div>
    </RouteWrapper>
  );
}
