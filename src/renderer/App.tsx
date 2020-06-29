import React, { useContext } from 'react';
import { GlobalContext, IGlobalContext } from './contexts';

import { StoreProvider } from 'easy-peasy';
import store from './store';

import { ApolloProvider } from '@apollo/react-hooks';
import { prepareApolloClient } from './helpers/apollo.client';

// import MainPage from './pages/main.page';
import MainPage from './pages/main';

const App = () => {
  const {
    state: { token },
  } = useContext<IGlobalContext>(GlobalContext);

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
