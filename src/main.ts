import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';

createApp(App)
  .use(VueChartkick as any)
  .use(store)
  .use(router)
  .mount('#app');
