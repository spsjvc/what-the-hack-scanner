import Vue from 'vue';
import * as _ from 'lodash';
import Axios from 'axios';

import store from 'Store';
import AuthApiService from 'Api/auth.service';

const AUTH_HEADER = 'Authorization';

export default {
  setLocalStorageAuthData(data) {
    localStorage.setItem('token', data.token || null);
    localStorage.setItem('user_id', data.user ? data.user.id : null);
    localStorage.setItem('user', JSON.stringify(data.user));
  },

  setAuthHeader(unset = false) {
    if (unset) {
      delete Axios.defaults.headers[AUTH_HEADER];
      return;
    }
    _.assign(
      Axios.defaults.headers,
      { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    );
  },

  initStoreAuth() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.setAuthHeader();
      store.commit('auth', userData);
      return AuthApiService.refreshUser().then((response) => {
        if (response.data) {
          this.updateUserInLocalStorage(response.data);
        }
      });
    }
    return this.setAuthHeader(true);
  },

  checkLocalStorage() {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      this.setAuthHeader();
    }

    return userData;
  },

  updateUserInLocalStorage(newUserData) {
    const userData = JSON.parse(localStorage.getItem('user'));
    _.assign(userData, newUserData);
    localStorage.setItem('user', JSON.stringify(userData));
  },

  login(data) {
    return AuthApiService.login(data).then((response) => {
      this.setLocalStorageAuthData(response.data);
      this.setAuthHeader();
      store.commit('auth', response.data.user);
      Vue.prototype.router.push({ name: 'home' });
      return response;
    });
  },

  register(data) {
    return AuthApiService.register(data).then((response) => {
      this.setLocalStorageAuthData(response.data);
      this.setAuthHeader();
      store.commit('auth', response.data.user);
      Vue.prototype.router.push({ name: 'home' });
      return response;
    });
  },

  logout() {
    AuthApiService.logout().then(() => {
      this.setLocalStorageAuthData({
        token: null,
        user: null,
      });
      this.setAuthHeader(true);
    });
    store.commit('deauth');
    Vue.prototype.router.push({ name: 'login' });
  },

  changePassword(data) {
    return AuthApiService.changePassword(data);
  },

  checkAuthStatus() {
    const userData = this.checkLocalStorage();
    if (!userData) {
      return false;
    }
    store.commit('auth', userData);
    return store.getters.activeUser;
  },
};
