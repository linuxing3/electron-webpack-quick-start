import { action, Action, ActionOn } from 'easy-peasy';

export interface AuthModel {
  authenticator: string;
  set: Action<AuthModel, any>;
}

const auth: AuthModel = {
  authenticator: 'jwt',
  set: action((state, payload) => {
    state.authenticator = payload;
  }),
};
export default auth;
