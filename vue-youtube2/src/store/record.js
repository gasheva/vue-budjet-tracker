
export default {
  actions: {
    async createRecord({ commmit, dispatch }, record) {
      try {
        return (await dispatch('request', { url: `http://localhost:3000/api/records`, method: 'POST', data: record, token: localStorage.getItem('accessToken') })) || {};
      } catch (e) {
        commmit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ commmit, dispatch }) {
      try {
        return (await dispatch('request', { url: `http://localhost:3000/api/records`, token: localStorage.getItem('accessToken') })) || {};
      } catch (e) {
        commmit('setError', e);
        throw e;
      }
    },
    async fetchRecordById({ commmit, dispatch }, id) {
      try {
        const record = (await dispatch('request', { url: `http://localhost:3000/api/records/${id}`, token: localStorage.getItem('accessToken') })) || {};
        return { ...record, id: id };
      } catch (e) {
        commmit('setError', e);
        throw e;
      }
    }

  }
}