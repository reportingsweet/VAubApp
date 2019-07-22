// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from '@/store'
// import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
var Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)
import loadMap from 'highcharts/modules/map'
import highchartsMore from 'highcharts/highcharts-more'
import moment from 'moment'

import VueRouter from 'vue-router'

import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

/* 
* Workaround for render error with vue-router 
*/
Vue.component('router-link', Vue.options.components.RouterLink);
Vue.component('router-view', Vue.options.components.RouterView);

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/NotificationPlugin'

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

highchartsMore(Highcharts)
loadMap(Highcharts)

import $ from 'jquery'

require('webpack-jquery-ui')
// require('webpack-jquery-ui/css');

// Vue.config.productionTip = false

Vue.use(BootstrapVue, HighchartsVue)
Vue.use(Highcharts)

Vue.use(VueRouter)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)

Vue.config.productionTip = false

// Vue.use(HighchartsVue.mapChart, { tagName: 'maps' })



let app

// router.beforeEach((to,from,next) => {
//   let currentUser = 'vaubrey@mail.com'
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   if(requiresAuth && !currentUser) next('Login')
//   else if (!requiresAuth && currentUser) next('/Dash')
//   else next()
// })

/* eslint-disable no-new */
if(!app) {
  app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}


export { $, Highcharts, moment, router}
  
  