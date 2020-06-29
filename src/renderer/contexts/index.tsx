/* eslint-disable react/prop-types */
import React, { useState, createContext, useEffect, ReactNode } from 'react';

export interface IGlobalState {
  table: string;
  currentItem: any;
  token: string;
}

export const defaultGlobalState: IGlobalState = {
  table: 'users',
  currentItem: {},
  token: '',
};

export const GlobalContext = createContext({ state: defaultGlobalState, changeState: null });

/**
 * GlobalContextProvider
 * @param param children is the chind component, state is the state of context
 * @example
 * <GlobalContextProvider state={state}></GlobalContextProvider>
 */
export const GlobalContextProvider = ({ children, state }: { children: ReactNode; state: IGlobalState }) => {
  const [globalState, setGlobalState] = useState<IGlobalState>(state || defaultGlobalState);

  const changeState = (updateValue: Partial<IGlobalState>) => {
    setGlobalState({ ...globalState, ...updateValue });
  };

  // const saveState = (state: IGlobalState) => {
  //   setGlobalState(state);
  // };

  /**
   * Snapshot state to localStorage
   */
  useEffect(() => {
    window.localStorage.setItem('table', globalState.table);
    window.localStorage.setItem('currentItem', JSON.stringify(globalState.currentItem));
    window.localStorage.setItem('token', globalState.token);
  });

  return <GlobalContext.Provider value={{ state: globalState, changeState }}>{children}</GlobalContext.Provider>;
};

/**
 * GlobalContextConsumer
 */
export const GlobalContextConsumer = GlobalContext.Consumer;
