import { createStore } from 'easy-peasy';
import users from './users';
import games from './games';
import auth from './auth';

const store = createStore({
  users,
  games,
  auth
})

export default store;
