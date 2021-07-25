
export default {
  actions: {
    async updateCategory({ dispatch, commit }, { title, limit, id }) {
      try {
        const category = await dispatch('request', { url: `http://localhost:3000/api/categories/${id}`, method: 'PUT', data: { title, limit } }) || {};
        return category;
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    },
    async fetchCategories({ dispatch, commit }) {
      try {
        return await dispatch('request', { url: `http://localhost:3000/api/categories`, token: localStorage.getItem('accessToken') }) || [];
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    },
    async fetchCategoryById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        console.log(uid);
        const category = await dispatch('request', { url: `http://localhost:3000/api/categories/${id}`, token: localStorage.getItem('accessToken') }) || {};
        return { ...category, id: id };

      } catch (e) {
        commit('setError', e)
        throw e;
      }
    },
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        let id = await dispatch('request', { url: `http://localhost:3000/api/categories`, method: 'POST', data: { title, limit }, token: localStorage.getItem('accessToken') });
        return { title, limit, id }
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    }
  }
}