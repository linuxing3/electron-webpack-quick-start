// Settings Hook - src/hooks/useSettings
import { useContext } from 'react';
import SettingsContext from '../../contexts/setting';

/**
 * @example
 * Any component do you want to toggle the theme from
 * const { settings, saveSettings } = useSettings();
 * const handleToggleTheme = () => {
 *      saveSettings({theme: "light"});
 * }
 */
export default () => {
  const context = useContext(SettingsContext);
  return context;
};
