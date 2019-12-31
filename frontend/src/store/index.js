import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';
import uuidv4 from 'uuid';

axios.defaults.baseURL = 'http://localhost:3000/';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        currentInitiativeTracker: {
            actors: [],
            started: false,
        },
        savedActors: [],
        filteredActors: [],
        savedActorsLoading: false,
        filter: 'all',
        sort: 'created',
    },
    getters: {
        isSignedIn: state => {
            return state.token !== null;
        },
        currentTrackerActors: state => {
            return state.currentInitiativeTracker.actors;
        }
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
        },
        deleteSavedActor(state, actor_id) {
            state.savedActors.forEach(actor => {
                if(actor.id === actor_id) {
                    const index = state.savedActors.indexOf(actor);
                    state.savedActors.splice(index, 1);
                }
            })
        },
        updateSavedActor(state, newActor) {
            state.savedActors.forEach(actor => {
                if(actor.id === newActor.id) {
                    Object.assign(actor, newActor);
                }
            })
        },
        updateFilteredActors(state, actors) {
            state.filteredActors = actors;
        },
        addActorToCurrentTracker(state, actor) {
            state.currentInitiativeTracker.actors.push({...actor});
            localStorage.setItem('currentInitiativeTracker', JSON.stringify(state.currentInitiativeTracker));
        },
        addSavedActorToCurrentTracker(state, actor) {
            let newActor = {...actor};
            newActor.id = uuidv4();
            state.currentInitiativeTracker.actors.push(newActor);
            localStorage.setItem('currentInitiativeTracker', JSON.stringify(state.currentInitiativeTracker));
        },
        linkSavedActorToCurrentTracker(state, actor) {
            if(!state.currentInitiativeTracker.actors.find(listActor => listActor.id === actor.id)){
                state.currentInitiativeTracker.actors.push(actor);
                localStorage.setItem('currentInitiativeTracker', JSON.stringify(state.currentInitiativeTracker));
            }
        },
        updateActorCurrentHealth(state, newActor) {
            const actor = state.currentInitiativeTracker.actors.find(actor => actor.id === newActor.actorId);
            actor.current_hit_points = newActor.newHealth;
        },
        updateCurrentTracker(state, newTracker) {
            state.currentInitiativeTracker = newTracker;
        },
        clearCurrentTracker(state) {
            localStorage.removeItem('currentInitiativeTracker');
            state.currentInitiativeTracker = {actors: []}
        },
    },
    actions: {
        async retrieveToken(context, credentials) {
            try{
                const response = await axios.post('/user/signin', {
                    email: credentials.email,
                    password: credentials.password,
                });
    
                if(response.status === 200) {
                    const token = response.data.token;
                    
                    localStorage.setItem('token', token);
                    context.commit('updateToken', token);
                    context.commit('signIn', true);

                    router.push('tracker');
                }
    
                return response;
            } catch (err) {
                if(err.response) {
                    return err.response;
                }
            }
        },
        async signUp(context, credentials) {
            try {
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
    
                    router.push('tracker');
                }

                return response;
            } catch (err) {
                if(err.response) {
                    return err.response;
                }
            }
        },
        async deleteActor(context, actor_id) {
            const response = await axios.delete('/actor', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + this.state.token
                },
                data: {actor_id},
            });

            if(response.status === 200) {
                context.commit('deleteSavedActor', actor_id)
            }
        },
        async retrieveSavedActors(context) {

            this.state.savedActorsLoading = true;
            try {
                const response = await axios.get('/actor', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer ' + this.state.token
                    }  
                });
                if(response.status === 200) {
                    const actors = response.data;
    
                    context.commit('updateSavedActors', actors);
                    
                    context.dispatch('updateFilter', this.state.filter)
                    context.dispatch('updateSort', this.state.sort);
                }
            } finally {
                this.state.savedActorsLoading = false;
            }
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
                await context.commit('addToSavedActors', newActor);

                await context.dispatch('updateFilter', this.state.filter)
                await context.dispatch('updateSort', this.state.sort);
                return true;
            } else {
                return false;
            }
        },
        async saveEditedActor(context, actor) {
            const response = await axios.put('/actor', {actor}, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + this.state.token
                }
            });

            if(response.status === 200) {
                await context.commit('updateSavedActor', response.data.updatedActor[0]);

                await context.dispatch('updateFilter', this.state.filter);
                await context.dispatch('updateSort', this.state.sort);
                return true;
            } else {
                return false;
            }
        },
        setTrackerFromLocal(context, newTracker) {
            context.commit('updateCurrentTracker', newTracker);
        },
        addActor(context, actor) {
            context.commit('addActorToCurrentTracker', actor);
        },
        linkSavedActorToCurrentTracker(context, actor) {
            let newActor = {...actor};
            newActor.current_hit_points = actor.total_hit_points;
            newActor.initiative = null;
            newActor.is_linked = true;
            context.commit('linkSavedActorToCurrentTracker', newActor)
        },
        addSavedActorToCurrentTracker(context, actor) {
            actor.current_hit_points = actor.total_hit_points;
            actor.initiative = null;
            context.commit('addSavedActorToCurrentTracker', actor);
        },
        updateFilter(context, filter) {
            this.state.filter = filter;

            if(filter !== 'all') {
                const filteredActors = this.state.savedActors.filter(actor => actor.npc === (this.state.filter === 'npc' ? true : false));
                context.commit('updateFilteredActors', filteredActors)
            } else {
                context.commit('updateFilteredActors', this.state.savedActors)
            }
        },
        updateActorCurrentHealth(context, actor) {
            context.commit('updateActorCurrentHealth', actor)
        },
        updateSort(context, sort) {
            this.state.sort = sort;
            let sortedActors = [];
            if(sort === 'player_name') {
                sortedActors = this.state.filteredActors.sort((a, b) => {
                    if (a.player_name && !b.player_name) return -1;
                    if (!a.player_name && b.player_name) return 1;
                    if (a.player_name < b.player_name) return -1;
                    if (a.player_name > b.player_name) return 1;
                    if (a.actor_name < b.actor_name) return -1;
                    if (a.actor_name > b.actor_name) return 1;
                    return 0;
                });
            } else {
                sortedActors = this.state.filteredActors.sort((a, b) => a[sort] < b[sort] ? -1 : 1);
            }

            if(sort === 'created' || sort === 'updated') {
                sortedActors.reverse();
            }
            context.commit('updateFilteredActors', sortedActors);
        },
        clearCurrentTracker(context) {
            context.commit('clearCurrentTracker');
        }
    }
});