import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { router } from './router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
      </QueryClientProvider>
    </>
  );
};

export default App;
