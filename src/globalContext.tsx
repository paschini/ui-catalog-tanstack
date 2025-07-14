import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { Error } from './components/Errors';
import type { GlobalActions } from './globalReducer';
import type { DeviceData } from './components/DeviceDataTypes';

export type GlobalStateType = {
  deviceList: DeviceData[];
  filteredDeviceList: DeviceData[];
  checkedFilterItems: string[];
  activeDeviceIndex: number;
  errors: Error[];
};

export type GlobalContext = {
  globalState: GlobalStateType;
  globalDispatch: Dispatch<GlobalActions>;
};

export const initialValue: GlobalContext = {
  globalState: {
    deviceList: [],
    filteredDeviceList: [],
    checkedFilterItems: [],
    activeDeviceIndex: 0,
    errors: []
  },
  globalDispatch: () => null
};

export const GlobalContext = createContext(initialValue);
