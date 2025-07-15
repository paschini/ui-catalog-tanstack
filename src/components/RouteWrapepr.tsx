import { ReactNode, useReducer } from 'react';
import { useCssLoader } from '../hooks/useCssLoader';
import { GlobalContext, initialValue } from '../globalContext';
import { globalReducer } from '../globalReducer';

interface RouteWrapperProps {
  children: ReactNode;
  styleModules: any[];
  loadingComponent?: ReactNode;
}

const RouteWrapper = ({ children, styleModules, loadingComponent }: RouteWrapperProps) => {
  const [globalState, globalDispatch] = useReducer(globalReducer, initialValue.globalState);

  const cssLoaded = useCssLoader(...styleModules);

  if (!cssLoaded) {
    return (
      loadingComponent || (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fff',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999
          }}
        ></div>
      )
    );
  }

  return <GlobalContext value={{ globalState, globalDispatch }}>{children}</GlobalContext>;
};

export default RouteWrapper;
