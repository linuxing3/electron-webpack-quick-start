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
  setState?: (s: any, o: any, fn: any) => IGlobalState;
}

/**
 * Here are the method of context, which can be called from child component
 */
export const setState = (s: IGlobalState, o: Partial<IGlobalState>, fn: any) => {
  return fn({ ...s, ...o });
};

export const GlobalContext = createContext<IGlobalContext>({
  state: {
    table: 'users',
    currentItem: {},
    token: '',
  },
  changeState: (s: any) => null,
  setState,
});
