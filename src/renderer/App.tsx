import React, { useContext } from 'react';
import { GlobalContext, IGlobalContext } from './contexts';

import { StoreProvider } from 'easy-peasy';
import store from './store';

import { ApolloProvider } from '@apollo/client';
import { prepareApolloClient } from './helpers/apollo.client';

import MainPage from './pages/main.page';

const App = () => {
  const {
    state: { token },
  } = useContext<IGlobalContext>(GlobalContext);

  const client = prepareApolloClient(token);
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <MainPage></MainPage>
      </StoreProvider>
    </ApolloProvider>
  );
};
export default App;
