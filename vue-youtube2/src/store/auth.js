// import firebase from "firebase";
export default {
    getters:{
        id: (st)=>st.id,
        accessToken: (st)=>st.accessToken,
        refreshToken: (st)=>st.refreshToken
    },
    mutations:{
        setId(state, id){
            state.id = id;
        },
        setAccess(state, token){
            state.accessToken = token;
        },
        setRefresh(state, token){
            state.refreshToken = token;
        }
    },
    actions: {
        saveInfo(_, {id, accessToken, refreshToken}){
            console.log('saveInfo');
            console.log(id);
            localStorage.setItem('id', id);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        async login({ dispatch, commit }, { email, password }) {
            try {
                // await firebase.auth().signInWithEmailAndPassword(email, password);
                const {accessToken, refreshToken, id} = await dispatch('request', {url:`http://localhost:3000/api/login`, method: 'POST', data:{username: email, password}});
                dispatch ('saveInfo', {accessToken, refreshToken, id});
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async logout({commit, dispatch}) {
            // await firebase.auth().signOut();
            await dispatch('request', {url:`http://localhost:3000/api/logout`, method: 'POST', data:{token: localStorage.getItem('refreshToken')}});
            localStorage.removeItem('id');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            commit('clearInfo');
        },
        async register({ dispatch, commit }, { email, password, name }) {
            try {
                // await firebase.auth().createUserWithEmailAndPassword(email, password);
                // const uid = await dispatch('getUid');
                // await firebase.database().ref(`/users/${uid}/info`).set({
                //     bill: 1000,
                //     name
                // });
                const {accessToken, refreshToken, id} = await dispatch('request', {url:`http://localhost:3000/api/registration`, method: 'POST', data:{username: name, password}});
                console.log(email);
                
                console.log('[x]register');
                console.log({accessToken, refreshToken, id});
                dispatch ('saveInfo', {accessToken, refreshToken, id});

            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}