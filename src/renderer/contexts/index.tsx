/* eslint-disable react/prop-types */
import React, { useState, createContext } from 'react';

export interface IGlobalState {
  table: string;
  currentItem: any;
  token: string;
}

const defaultGlobalState: IGlobalState = {
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
export const GlobalContextProvider = ({ children, state }) => {
  const [globalState, setGlobalState] = useState<IGlobalState>(state || defaultGlobalState);

  const changeState = (updateValue: Partial<IGlobalState>) => {
    setGlobalState({ ...globalState, ...updateValue });
  };

  return <GlobalContext.Provider value={{ state: globalState, changeState }}>{children}</GlobalContext.Provider>;
};

/**
 * GlobalContextConsumer
 */
export const GlobalContextConsumer = GlobalContext.Consumer;
