import { createFileRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import Main from '../components/Main';
import DeviceList from '../components/DeviceList';
import RouteWrapper from '../components/RouteWrapepr';
import { useDeviceData } from '../hooks/useDeviceData';
import styles from './layout.module.css';

export const Route = createFileRoute('/')({
  component: Home
});

function Home() {
  const { data, isLoading, error } = useDeviceData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <RouteWrapper styleModules={[styles]}>
      <div className={styles.layout}>
        <Header />
        <Main version={data?.version || ''}>
          <DeviceList data={data?.devices || []} />
        </Main>
      </div>
    </RouteWrapper>
  );
}
