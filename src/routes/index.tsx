import { createFileRoute } from '@tanstack/react-router';
import { createServerFn, useRouter } from '@tanstack/react-start';
import { GlobalContext, initialValue } from '../globalContext';
import { useReducer } from 'react';
import { globalReducer } from '../globalReducer';
import Header from '../components/Header';
import Main from '../components/Main';
import styles from './index.module.css';
import { Data, DataSchema } from '../components/DeviceDataTypes';

const getData = createServerFn({ method: 'GET' }).handler(async (): Promise<Data> => {
  const res = await fetch('https://static.ui.com/fingerprint/ui/public.json');
  const rawData = await res.json();

  return DataSchema.parse(rawData);
});

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getData()
});

function Home() {
  // const router = useRouter();
  const data: Data = Route.useLoaderData();

  const [globalState, globalDispatch] = useReducer(globalReducer, initialValue.globalState);

  return (
    <div className={styles.layout}>
      <GlobalContext value={{ globalState, globalDispatch }}>
        <Header />
        {/*<Menu />*/}
        <Main data={data} />
      </GlobalContext>
    </div>
  );
}
