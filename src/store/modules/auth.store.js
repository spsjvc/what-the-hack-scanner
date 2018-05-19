import * as _ from 'lodash';
import { User } from 'Models/user.model';

const state = {
  activeUser: null,
};

const getters = {
  activeUser: (state) => state.activeUser,
  isLogged: (state) => !_.isEmpty(state.activeUser),
  isAdmin: (state, getters) => getters.isLogged && state.activeUser.isAdmin(),
  activeUserRole: (state) => state.activeUser ? state.activeUser.role : 'guest',

};

const mutations = {
  deauth(state) {
    localStorage.clear();
    state.activeUser = null;
  },
  auth(state, activeUser) {
    state.activeUser = new User(activeUser);
  },
};

export {
  state,
  getters,
  mutations,
};
