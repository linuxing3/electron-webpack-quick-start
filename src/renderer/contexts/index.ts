import { createContext } from 'react';

export interface IGlobalState {
  table: string;
  currentItem: any;
  token: string;
}
export interface IGlobalContext {
  state: IGlobalState;
  changeState: any;
}

export const GlobalContext = createContext<IGlobalContext>({
  state: {
    table: 'users',
    currentItem: {},
    token: ''
  },
  changeState: (s: any) => {},
});

