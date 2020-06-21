import { thunk, action, actionOn, Action, Thunk, ActionOn } from 'easy-peasy';
import { StoreModel } from './index';

export interface GameModel {
  table: string;
  items: any[];
  cache?: {
    add: any[];
    remove: any[];
    update: any[];
  };
  add?: Action<GameModel, any>;
  remove?: Action<GameModel, any>;
  find?: Action<GameModel, any>;
  update?: Action<GameModel, any>;
  upload?: Thunk<GameModel, any>;
  fetch?: Thunk<GameModel, any>;
  addListener?: ActionOn<GameModel, StoreModel>;
  removeListener?: ActionOn<GameModel, StoreModel>;
}

const games: GameModel = {
  table: 'games',
  items: [],
  add: action((state, payload) => {
    state.items.push(payload);
  }),
  remove: action((state, payload) => {
    const { id } = payload;
    state.items = state.items.filter((item) => item.id !== id);
  }),
  find: action((state, payload) => {
    const { id } = payload;
    state.items = state.items.filter((item) => item.id === id);
  }),
  update: action((state, payload) => {
    const { id, data } = payload;
    let found = state.items.filter((item) => item.id === id)[0];
    found = { ...found, ...data };
  }),
};
export default games;
