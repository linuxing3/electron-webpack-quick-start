/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const SettingsContext = React.createContext({});

const defaultSettings = {
  theme: 'light',
  version: '1.0.0',
  target: 'electron',
};

/**
 * Setting Provider
 * @example
 *   <SettingsProvider settings={settings}>
 *     <App />
 *   </SettingsProvider>
 * };
 */
export const SettingsProvider = ({ children, settings }) => {
  const [currentSettings, setCurrentSettings] = useState(settings || defaultSettings);

  const saveSettings = (values) => {
    setCurrentSettings(values);
  };

  return (
    <SettingsContext.Provider value={{ settings: currentSettings, saveSettings }}>{children}</SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
