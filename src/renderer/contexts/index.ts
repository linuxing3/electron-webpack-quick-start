import React from 'react';
export const GlobalContext = React.createContext({
  state: {
    table: 'users',
    currentItem: {},
    token: ''
  },
  changeState: (s: any) => {},
});

