import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/style/theme';
import Layout from './components/Layout';
import AllRoutes from './AllRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <AllRoutes />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
