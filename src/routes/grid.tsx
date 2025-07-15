import { createFileRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import DeviceGrid from '../components/DeviceGrid';
import RouteWrapper from '../components/RouteWrapepr';
import { useDeviceData } from '../hooks/useDeviceData';
import styles from './layout.module.css';

export const Route = createFileRoute('/grid')({
  component: GridPage
});

function GridPage() {
  const { data, isLoading, error } = useDeviceData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <RouteWrapper styleModules={[styles]}>
      <div className={styles.layout}>
        <Header />
        <div className={styles.main}>
          <div className={styles.contentArea}>
            <DeviceGrid data={data?.devices || []} />
          </div>
        </div>
      </div>
    </RouteWrapper>
  );
}
