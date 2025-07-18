import { useContext, useEffect } from 'react';
import Button from '../uiComponents/Button';
import CheckBox from '../uiComponents/CheckBox';
import { GlobalContext } from '@/globalContext';
import styles from './FilterList.module.css';

const FilterList = () => {
  const {
    globalState: { deviceList, filteredDeviceList, checkedFilterItems },
    globalDispatch
  } = useContext(GlobalContext);

  const list = [
    { id: 'unifi', name: 'UniFi' },
    { id: 'unifi lte', name: 'UniFi LTE' },
    { id: 'unifi protect', name: 'UniFi Protect' },
    { id: 'unifi access', name: 'UniFi Access' },
    { id: 'airmax', name: 'AirMax' },
    { id: 'edgemax', name: 'EdgeMax' }
  ];

  const changeCheckBoxes = (id: string) => {
    if (checkedFilterItems.includes(id)) {
      globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: checkedFilterItems.filter((item) => item !== id) });
    } else {
      globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: [...checkedFilterItems, id] });
    }
  };

  useEffect(() => {
    if (checkedFilterItems.length > 0) {
      const filteredList = deviceList
        .filter((device) => {
          return checkedFilterItems.includes(device.line.name.toLowerCase());
        })
        .sort((a, b) => a.line.name.localeCompare(b.line.name));

      globalDispatch({ type: 'SET_FILTERED_DEVICE_LIST', payload: filteredList });
    }
  }, [checkedFilterItems, deviceList, globalDispatch]);

  return (
    <div className={styles.listContainer}>
      <h4 className={styles.title}>Product Line</h4>
      {list.map((item) => (
        <div key={item.id}>
          <CheckBox
            id={item.id}
            label={item.name}
            isChecked={checkedFilterItems.includes(item.id)}
            onChange={() => changeCheckBoxes(item.id)}
          />
        </div>
      ))}
      <Button
        onClick={() => {
          globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: [] });
          globalDispatch({ type: 'SET_FILTERED_DEVICE_LIST', payload: [] });
        }}
        type={'danger'}
        disabled={filteredDeviceList.length === 0}
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterList;
