// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from './components/SidebarPlugin'

// asset imports
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'


/* THIS CAUSES BOOTSTRAP NOT TO WORK */
import './assets/scss/material-dashboard.scss'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import 'vue-material/dist/theme/default.css'

// library auto imports
import 'es6-promise/auto'

/**
 * This is the main Light Bootstrap Dashboard Vue plugin.
 * Where dashboard related plugins are registerd.
 */
export default{
  install (Vue) {
    Vue.use(SideBar)
    Vue.use(VueMaterial)
  }
}
