import type { GlobalStateType } from './globalContext.tsx';
import type { Error } from './components/Errors.tsx';
import type { DeviceData } from './components/DeviceDataTypes';

export type GlobalActions =
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_DEVICE_LIST'; payload: DeviceData[] }
  | { type: 'SET_FILTERED_DEVICE_LIST'; payload: DeviceData[] }
  | { type: 'SET_CHECKED_FILTER_ITEMS'; payload: string[] };
// | { type: 'SET_ACTIVE_DEVICE'; index: number };

export const globalReducer = (state: GlobalStateType, action: GlobalActions): GlobalStateType => {
  switch (action.type) {
    case 'SET_DEVICE_LIST': {
      return {
        ...state,
        deviceList: action.payload
      };
    }

    case 'SET_FILTERED_DEVICE_LIST': {
      return {
        ...state,
        filteredDeviceList: action.payload
      };
    }

    case 'SET_CHECKED_FILTER_ITEMS':
      return {
        ...state,
        checkedFilterItems: action.payload
      };

    // case 'SET_ACTIVE_DEVICE': {
    //   return {
    //     ...state,
    //     activeDeviceIndex: action.index
    //   };
    // }

    case 'SET_ERROR': {
      const errorExists = state.errors.some((error) => error.message === action.payload.message);
      if (errorExists) {
        return state;
      }

      return { ...state, errors: [...state.errors, action.payload] };
    }
    default: {
      return state;
    }
  }
};
