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
        savedActors: localStorage.getItem('savedActors') || [],
        savedActorsLoading: false,
    },
    getters: {
        isSignedIn: state => {
            return state.token !== null;
        },
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
        },
        signIn(state, status) {
            state.isSignedIn = status;
        },
        addToSavedActors(state, actor) {
            state.savedActors.push(actor);
        },
        updateSavedActors(state, actors) {
            state.savedActors = actors;
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
            context.commit('updateToken', token);
            context.commit('signIn', true);
        },
        async signUp(context, credentials) {
            const response = await axios.post('/user/signup', {
                email: credentials.email,
                username: credentials.username,
                password: credentials.password,
            });

            if(response.status === 200 && response.data.token) {
                const token = response.data.token;
                
                localStorage.setItem('token', token);
                context.commit('retrieveToken', token);
                context.commit('signIn', true);
            }
        },
        async retrieveSavedActors(context) {

            this.state.savedActorsLoading = true;
            
            const response = await axios.get('/actor', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + this.state.token
                }  
            });
            if(response.status === 200) {
                const actors = response.data;

                context.commit('updateSavedActors', actors);
            }
            this.state.savedActorsLoading = false;
        },
        async saveActor(context, actor) {
            const response = await axios.post('/actor', actor, {
            headers: {
                'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + this.state.token
                }
            });

            if(response.status === 200) {
                const newActor = response.data.returnedActor[0];
                context.commit('addToSavedActors', newActor);
            }
        }
    }
});