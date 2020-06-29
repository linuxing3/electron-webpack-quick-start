import React, { useContext } from 'react';
import useGlobal from './helpers/hooks/useGlobal';

import { StoreProvider } from 'easy-peasy';
import store from './store';

import { ApolloProvider } from '@apollo/react-hooks';
import { prepareApolloClient } from './helpers/apollo.client';

import MainPage from './pages/main.page';
// import MainPage from './pages/main';

const App = () => {
  const {
    state: { token },
  } = useGlobal();

  const client = prepareApolloClient(token);
  (window as any).apolloclient = client;

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <MainPage></MainPage>
      </StoreProvider>
    </ApolloProvider>
  );
};
export default App;
