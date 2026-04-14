// src/store/auth.js
import { mockUsers } from '@/mock/users';

export default {
  namespaced: true,
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    UPDATE_PREFERENCES(state, prefs) {
      if (!state.user) return;
      state.user = {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          ...prefs,
        },
      };
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );
      if (!user) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      commit('SET_USER', user);
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    favorites: (state) => (state.user ? state.user.favorites : []),
    preferences: (state) => (state.user ? state.user.preferences : {}),
  },
};