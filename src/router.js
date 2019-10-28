import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import LogoutPage from './views/LogoutPage.vue'
import store from './store'

import LoginForm from "@/components/LoginForm";
import LogoutPage from "@/views/LogoutPage";
import EmergencyInformation from "@/views/EmergencyInformation";
import EvacAssist from "@/components/EvacAssist.vue";
import AlertsInformation from "@/components/AlertsInformation";
import EmergencyContactList from "@/views/EmergencyContactList";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // routes: [
  //   {
  //     path: '/',
  //     name: 'login',
  //     component: () => import(/* webpackChunkName: "login" */ './components/LoginForm.vue')
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     component: () => import(/* webpackChunkName: "login" */ './components/LoginForm.vue')
  //   },
  //   {
  //     path: '/emergency-information',
  //     name: 'emergency-information',
  //     component: () => import(/* webpackChunkName: "emergency-information" */ './views/EmergencyInformation.vue'),
  //     meta: {
  //       requiresAuth: true
  //     }
  //   },
  //   {
  //     path: '/logout',
  //     name: 'logout',
  //     component: () => import('./views/LogoutPage.vue')
  //   }
  // ]
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: LoginForm
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: LoginForm
    // },
    {
      path: '/',
      name: 'emergency-information',
      component: EmergencyInformation,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/assistance',
      name: 'evacuation-assistance',
      component: EvacAssist,
      meta: {}
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: AlertsInformation,
      meta: {}
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: EmergencyContactList,
      meta: {}
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutPage
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if(store.getters.isLoggedIn) {
//       next();
//       return;
//     }
//     next('/login');
//   }
//   else {
//     next();
//   }
// })

export default router;
