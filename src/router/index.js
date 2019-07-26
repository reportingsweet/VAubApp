import Vue from 'vue'
import Router from 'vue-router'
import PVinTable from '@/components/PVinTable'
// import Home from '@/components/Home'
// import Charts from '@/components/Charts'
import Login from '@/components/Login'

import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Reminders from '@/pages/Reminders.vue'
import Placement from '@/pages/Placement.vue'
import Liquidation from '@/pages/Liquidation.vue'
import FaceValue from '@/pages/FaceValue.vue'



import OldDash from '@/pages/Dashboard_old.vue'
import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/TableList.vue'
import Typography from '@/pages/Typography.vue'
import Icons from '@/pages/Icons.vue'
import Notifications from '@/pages/Notifications.vue'
import DataLoad from '@/pages/DataLoad.vue'

// import Maps from '@/pages/Maps.vue'
// import UpgradeToPRO from '@/pages/UpgradeToPRO.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  hashbang: false,
  routes: [
    
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/Dash',
    //   name: 'Dash',
    //   component: Home,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },    
    {
      path: '/PVinTable',
      name: 'PVinTable',
      component: PVinTable,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/Charts',
    //   name: 'Charts',
    //   component: Charts,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Dash',
      component: DashboardLayout,
      // redirect: '/dash',
      children: [
        {
          path: '/DataLoad',
          name: 'Data Load',
          component: DataLoad
        },
        {
          path: '/Placement',
          name: 'Placement Vintages',
          component: Placement
        },
        {
          path: '/LiquidationCurves',
          name: 'Liquidation Curves',
          component: Liquidation
        },
        {
          path: '/Reminders',
          name: 'Reminders',
          component: Reminders
        },
        {
          path: '/FaceValue',
          name: 'Face Value',
          component: FaceValue
        },


        {
          path: '/dashboard_old',
          name: 'Material Dash',
          component: OldDash
        },
        {
          path: '/user',
          name: 'User Profile',
          component: UserProfile
        },
        {
          path: '/table',
          name: 'Table List',
          component: TableList
        },
        {
          path: '/typography',
          name: 'Typography',
          component: Typography
        },
        {
          path: '/icons',
          name: 'Icons',
          component: Icons
        },
        // {
        //   path: '/maps',
        //   name: 'Maps',
        //   meta: {
        //     hideFooter: true
        //   },
        //   component: Maps

        // },
        {
          path: '/notifications',
          name: 'Notifications',
          component: Notifications
        }
      ]
    }
  ]
})

export default router
