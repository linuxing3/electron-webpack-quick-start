// Settings Hook - src/hooks/useSettings
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/index';

/**
 * @example
 * Any component do you want to toggle the theme from
 * const { state, changeState } = useGlobal();
 * const somefn = () => {
 *    changeState({ name: "game"});
 * }
 */
export default () => {
  const context = useContext(GlobalContext);
  return context;
};
