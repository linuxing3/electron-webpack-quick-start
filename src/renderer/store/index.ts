import { createStore } from 'easy-peasy';
import users, { UserModel } from './users';
import games, { GameModel } from './games';
import auth, { AuthModel } from './auth';

export interface StoreModel {
  users: UserModel,
  games: GameModel,
  auth: AuthModel
}
export const storeModel: StoreModel = {
  users,
  games,
  auth
}

const store = createStore(storeModel);
window.store = store;

export default store;
