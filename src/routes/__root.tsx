import { ReactNode, useReducer } from 'react';
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import { GlobalContext, initialValue } from '../globalContext';
import { globalReducer } from '../globalReducer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours long cache
      gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false
    }
  }
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ]
  }),
  component: RootComponent
});

function RootComponent() {
  const [globalState, globalDispatch] = useReducer(globalReducer, initialValue.globalState);

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <GlobalContext value={{ globalState, globalDispatch }}>
          <Outlet />
        </GlobalContext>
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <title>TanStack Start Starter</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
