import { thunk, action, actionOn, Action, Thunk, ActionOn } from 'easy-peasy';
import axios from '../helpers/axios.client';
import { find, remove } from 'lodash';
import { StoreModel } from './index';

const BASE_URL = 'http://127.0.0.1/api/v1/users?table=users';

export interface UserModel {
  table: string;
  items: any[];
  cache?: {
    add: any[];
    remove: any[];
    update: any[];
  },
  add?: Action<UserModel, any>;
  remove?: Action<UserModel, any>;
  find?: Action<UserModel, any>;
  update?: Action<UserModel, any>;
  upload?: Thunk<UserModel, any>;
  fetch?: Thunk<UserModel, any>;
  addListener?: ActionOn<UserModel, StoreModel>;
  removeListener?: ActionOn<UserModel, StoreModel>;
}

const users: UserModel = {
  table: 'users',
  items: [],
  cache: {
    add: [],
    remove: [],
    update: []
  },
  add: action((state, payload) => {
    state.items.push(payload);
  }),
  remove: action((state, payload) => {
    const { id } = payload;
    state.items = remove(state.items, (item) => item.id === id );
  }),
  find: action((state, payload) => {
    const { id } = payload;
    const found = find(state.items, ['id', payload.id]);
    state.items = [ found ];
  }),
  update: action((state, payload) => {
    const { id, data } = payload;
    let found = find(state.items, ['id', payload.id]);
    found = { ...found, ...data};
  }),
  upload: thunk(async (actions, payload) => {
    await axios.post(BASE_URL, payload);
  }),
  fetch: thunk(async (actions, payload) => {
    const response = await axios.get(BASE_URL);
    response.data.data.forEach(item => {
      actions.add(item);
    })
  }),
  addListener: actionOn(
    // target resolver
    (actions, storeActions) => actions.add,
    // target middleware
    (state, target) => { 
      state.cache.add.push(target.payload)
    }
  ),
  removeListener: actionOn(
    // target resolver
    (actions, storeActions) => actions.remove,
    // target middleware
    (state, target) =>  { 
      state.cache.remove.push(target.payload) 
    }
  )
}
export default users;
