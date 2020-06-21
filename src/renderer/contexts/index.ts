import { createContext } from 'react';

export interface IGlobalState {
  table: string;
  currentItem: any;
  token: string;
  theme?: string;
  locale?: string;
  setting?: any;
  target?: string;
}
export interface IGlobalContext {
  state: IGlobalState;
  changeState: (s: any) => IGlobalState;
}

export const GlobalContext = createContext<IGlobalContext>({
  state: {
    table: 'users',
    currentItem: {},
    token: ''
  },
  changeState: (s: any) => null,
});

