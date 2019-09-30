<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}" :input="pathName" style="height:100%;">
    <!-- <appHeader /> -->
    <notifications></notifications>

      
    
    <side-bar>
 
      <!-- <br> -->
      <br>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/Placements">
        <md-icon>dashboard</md-icon>
        <p>Placements</p>
      </sidebar-link>

      <sidebar-link to="/Reminders">
        <md-icon>person</md-icon>
        <p>Reminders</p>
      </sidebar-link>

       <sidebar-link to="/LiquidationCurves">
        <md-icon>bubble_chart</md-icon>
        <p>Liquidation</p>
      </sidebar-link>

       <sidebar-link to="/FaceValue">
        <md-icon>monetization_on</md-icon>
        <p>Face Value</p>
      </sidebar-link>

      <sidebar-link to="/DataLoad">
        <md-icon class="material-icons">swap_vertical_circle</md-icon>
        <p>Data</p>
      </sidebar-link>
      

      <!-- <div class="tab">

        <div class="component" @click="selectedComponent='Placement'">

          <md-icon>dashboard</md-icon>
          <p style="color: white; font-size: 16px;">Placement</p>

        </div>

        <div class="component" @click="selectedComponent='Reminders'">
          <md-icon>person</md-icon>
          <p style="color: white; font-size: 16px;">Reminders</p>
        </div>

        <div class="component" @click="selectedComponent='Liquidation'">
          <md-icon>bubble_chart</md-icon>
          <p style="color: white; font-size: 16px;">Liquidation</p>
        </div>

        <div class="component" @click="selectedComponent='FaceValue'">
          <md-icon>monetization_on</md-icon>
          <p style="color: white; font-size: 16px;">Face Value</p>
        </div>

      </div> -->



<!-- OLD STUFF --v  -->
<!-- 
      <sidebar-link to="/dashboard_old">
        <md-icon>dashboard</md-icon>
        <p>Material Dash</p>
      </sidebar-link> -->
      
      <!--
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>

      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>-->
    </side-bar>

    <div class="main-panel">

      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <!-- <component :is="selectedComponent" v-if="selectedComponent" /> -->

      <content-footer 
        v-if="!$route.meta.hideFooter" 
        :class="{ 'foot-fix': isDash, foot: !isDash }">
      </content-footer>

    </div>
  </div>
</template>
<style lang="scss">
  .foot {
    // position: absolute;
    margin-top: 20px;
    bottom: 0px;
    width: 90%;
  }
  .foot-fix {
     position: fixed;
     margin-top: 20px;
     bottom: 0px;
     width: 90%;
  }
</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

// import Header from '@/components/shared/Header'
import Placement from '@/pages/Placement'
import FaceValue from '@/pages/Placement'
import Liquidation from '@/pages/Placement'
import Reminders from '@/pages/Placement'
import DataLoad from '@/pages/DataLoad'
// import { FaceValue, Liquidation, Reminders } from '@/pages'

export default {
  data () {
    return {
      isDash: 0,
      selectedComponent: ''
    }
  },
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,

    Reminders,
    Placement,
    Liquidation,
    FaceValue,
    DataLoad
    // appHeader: Header
  },
  mounted () {
    window.location.pathname.includes('Dash') ? this.isDash = 1 : this.isDash = 0
  },
  computed: {
    pathName() {
       window.location.pathname.includes('Dash') ? this.isDash = 1 : this.isDash = 0
       return window.location.pathname
    }
  },
  watch: {
    $route(to, from) {
      window.location.pathname.includes('Dash') ? this.isDash = 1 : this.isDash = 0
    },
    selectedComponent: function() {
      console.log(this.selectedComponent)
    }
  }
}
</script>

<style scoped>

  /* .main-panel{
    height: 500px;
  } */
</style>
