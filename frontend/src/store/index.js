import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        currentInitiativeTracker: {
            actors: {},
        },
        isSignedIn: false,
    },
    getters: {
        getIsSignedIn: state => {
            return state.isSignedIn;
        }
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token;
        },
        signIn(state, status) {
            state.isSignedIn = status;
        }
    },
    actions: {
        async retrieveToken(context, credentials) {
            const response = await axios.post('/user/signin', {
                email: credentials.email,
                password: credentials.password,
            });
            const token = response.data.token;
            
            localStorage.setItem('token', token);
            context.commit('retrieveToken', token);
            context.commit('signIn', true);
        }
    }
});