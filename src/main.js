import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import styles from './styles/styles.css'
import axios from 'axios'
import {BootstrapVue, LinkPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(LinkPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ssoPlugin from '@psu/sso';

Vue.use(ssoPlugin, { store: store });

Vue.prototype.$appName = "EMERGENCY";
Vue.prototype.$envName = "test";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
