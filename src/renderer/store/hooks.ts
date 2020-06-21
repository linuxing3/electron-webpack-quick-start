import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from './index';

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
