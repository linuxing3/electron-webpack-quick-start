import { thunk, action } from 'easy-peasy';
import axios from '../helpers/axios.client';
import { find, remove } from 'lodash';

const BASE_URL = 'http://127.0.0.1/api/v1/users?table=users';

const users = {
    items: [],
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
      const found = find(state.items, ['id', payload.id]);
      found = { ...found, ...data};
    }),
    update: thunk(async (actions, payload) => {
      await axios.post(BASE_URL, payload);
    }),
    fetch: thunk(async (actions, payload) => {
      const response = await axios.get(BASE_URL);
      response.data.data.forEach(item => {
        actions.add(item);
      })
    })
}
export default users;
