import React from 'react';
import MainPage from './pages/main.page';
import { StoreProvider } from 'easy-peasy';
import store from './store';

const App = () => (
  <StoreProvider store={store}>
    <MainPage></MainPage>
  </StoreProvider>
);
export default App;
