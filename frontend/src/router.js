import VueRouter from 'vue-router'

import SignInSignUp from './components/SignInSignUp';
import InitiativeScreen from './components/InitiativeScreen';
import ManageActors from './components/ManageActors';

const routes = [
  {path: '/signin', component: SignInSignUp},
  {path: '/tracker', component: InitiativeScreen},
  // {path: '/encounters', component: ManageEncounters},
  {path: '/actors', component: ManageActors},
  {path: '/', component: InitiativeScreen},
];

export default new VueRouter({
  routes,
  mode: 'history',
});
