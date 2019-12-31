import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router';

Vue.use(VueRouter);

import store from './store';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
