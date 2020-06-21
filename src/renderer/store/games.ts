import { action } from 'easy-peasy';
const games = {
    items: [],
    add: action((state, payload) => {
      state.items.push(payload);
    }),
    remove: action((state, payload) => {
      const { id } = payload;
      state.items = state.items.filter(item => item.id !== id);
    }),
    find: action((state, payload) => {
      const { id } = payload;
      state.items = state.items.filter(item => item.id === id);
    }),
    update: action((state, payload) => {
      const { id, data } = payload;
      const found = state.items.filter(item => item.id === id)[0];
      found = { ...found, ...data};
    })
}
export default games;
