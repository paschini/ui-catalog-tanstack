import { ReactNode } from 'react';
import { useCssLoader } from '@/hooks/useCssLoader';

interface RouteWrapperProps {
  children: ReactNode;
  styleModules: any[];
  loadingComponent?: ReactNode;
}

const RouteWrapper = ({ children, styleModules, loadingComponent }: RouteWrapperProps) => {
  // const cssLoaded = useCssLoader(...styleModules);

  // if (!cssLoaded) {
  //   return (
  //     loadingComponent || (
  //       <div
  //         style={{
  //           width: '100vw',
  //           height: '100vh',
  //           backgroundColor: '#fff',
  //           position: 'fixed',
  //           top: 0,
  //           left: 0,
  //           zIndex: 9999
  //         }}
  //       ></div>
  //     )
  //   );
  // }

  return <>{children}</>;
};

export default RouteWrapper;
