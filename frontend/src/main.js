import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import SignInSignUp from './components/SignInSignUp';
import InitiativeScreen from './components/InitiativeScreen';
import ManageActors from './components/ManageActors';

Vue.use(VueRouter);

const routes = [
  {path: '/signin', component: SignInSignUp},
  {path: '/tracker', component: InitiativeScreen},
  // {path: '/encounters', component: ManageEncounters},
  {path: '/actors', component: ManageActors},
  {path: '/', component: InitiativeScreen},
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

import store from './store';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
