import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + ;

axios.interceptors.request.use((config) => {
  const authJson = localStorage.getItem('auth');
  console.log('auth',authJson);
  if(authJson) {
    const auth = JSON.parse(authJson);
    config.headers['Authorization'] = 'Bearer ' + auth.token;
  }
  return config;
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
