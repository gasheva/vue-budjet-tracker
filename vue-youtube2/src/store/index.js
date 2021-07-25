import Vue from "vue";
import Vuex from "vuex";
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'
// require('dotenv').config();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
    async fetchCurrency() {
      // const key = process.env.VUE_APP_FIXER;
      const key = '88b10edc95c47f34e15a36f3f6c8cdf3'
      const res = await (await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)).json();
      return res;
    },
    // осуществление запросов на сервер с помощью fetch
    async request({ commit }, { url, method = 'GET', data = null, token = null }) {
      try {
        let headers = {};
        let body;
        if (data)
          body = JSON.stringify(data);
        headers = { 'Content-Type': 'application/json' };
        if (token)
          headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
        const resp = await fetch(url, {
          method,
          headers,
          body
        });
        const respJson = (await resp.json()) || {};
        // при неаутентифицированном запросе из localStorage удаляется id пользователя
        if (resp.status == 401) {
          localStorage.removeItem('id');
          commit('setError', respJson.msg);
          return;
        }
        return respJson;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  },
});
