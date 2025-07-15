import { useReducer } from 'react';
import { GlobalContext, initialValue } from '../globalContext';
import { globalReducer } from '../globalReducer';
import { createFileRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import DeviceGrid from '../components/DeviceGrid';
import Main from '../components/Main';
import RouteWrapper from '../components/RouteWrapepr';
import { useDeviceData } from '../hooks/useDeviceData';
import styles from './layout.module.css';

export const Route = createFileRoute('/grid')({
  component: GridPage
});

function GridPage() {
  const [globalState, globalDispatch] = useReducer(globalReducer, initialValue.globalState);

  const { data, isLoading, error } = useDeviceData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <RouteWrapper styleModules={[styles]}>
      <div className={styles.layout}>
        <Header />
        <GlobalContext value={{ globalState, globalDispatch }}>
          <Main version={data?.version || ''}>
            <DeviceGrid data={data?.devices || []} />
          </Main>
        </GlobalContext>
      </div>
    </RouteWrapper>
  );
}
