import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalContext, GlobalStateType } from '@/globalContext';
import type { GlobalActions } from '@/globalReducer';
import { mockDeviceArrays } from './mockDeviceData';

type TestWrapperProps = {
  children: ReactNode;
  mockGlobalState?: Partial<GlobalStateType>;
  mockDispatch?: vi.Mock<void, [GlobalActions]>;
};

export const TestWrapper = ({ children, mockGlobalState = {}, mockDispatch = vi.fn() }: TestWrapperProps) => {
  const defaultGlobalState: GlobalStateType = {
    deviceList: mockDeviceArrays.mixed,
    filteredDeviceList: [],
    checkedFilterItems: [],
    activeDeviceIndex: 0,
    errors: []
  };

  const mergedGlobalState = {
    ...defaultGlobalState,
    ...mockGlobalState
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{
          globalState: mergedGlobalState,
          globalDispatch: mockDispatch
        }}
      >
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};
