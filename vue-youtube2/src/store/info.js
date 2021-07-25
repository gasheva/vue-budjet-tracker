// import firebase from "firebase";
export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = null;
        }
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                const info = await dispatch('request', {url:`http://localhost:3000/api/info/${localStorage.getItem('id')}`, token: localStorage.getItem('accessToken')});
                commit('setInfo', info);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async updateInfo({ dispatch, commit, getters}, toUpdate) {
            try {
                const updateData = {...getters.info, ...toUpdate};
                await dispatch('request', {url:`http://localhost:3000/api/info/${localStorage.getItem('id')}`, method:'PUT', data:toUpdate, token: localStorage.getItem('accessToken')});
                commit('setInfo', updateData);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    },
    getters: {
        info: s => s.info
    }
}