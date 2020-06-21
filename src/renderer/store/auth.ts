import { action } from 'easy-peasy';
const auth = {
    authenticator: 'jwt',
    set: action((state, payload) => {
      state.authenticator = payload
    })
}
export default auth;
