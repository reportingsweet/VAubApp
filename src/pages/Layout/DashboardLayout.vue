<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}" :input="pathName" style="height:100%;">
    <!-- <appHeader /> -->
    <notifications></notifications>

    <side-bar id="sidebar-comp" class="sidebar-comp-active"
      :isActive="sidebarActive"
    >
 
      <!-- <br> -->
      
      <br>
      <mobile-menu slot="content"></mobile-menu>

        <sidebar-link to="/Placements" class="sidebar-item" v-if="linkIsActive">
          <md-icon>dashboard</md-icon>
          <p>Placements</p>
        </sidebar-link>

        <sidebar-link to="/Reminders" class="sidebar-item" v-if="linkIsActive">
          <md-icon>person</md-icon>
          <p>Reminders</p>
        </sidebar-link>

        <sidebar-link to="/LiquidationCurves" class="sidebar-item" v-if="linkIsActive">
          <md-icon>bubble_chart</md-icon>
          <p>Liquidation</p>
        </sidebar-link>

        <sidebar-link to="/FaceValue" class="sidebar-item" v-if="linkIsActive">
          <md-icon>monetization_on</md-icon>
          <p>Face Value</p>
        </sidebar-link>

        <sidebar-link to="/DataLoad" class="sidebar-item" v-if="linkIsActive">
          <md-icon class="material-icons">swap_vertical_circle</md-icon>
          <p>Data</p>
        </sidebar-link>
      
    </side-bar>

    <div class="main-panel" id="main-panel">

      <!-- <b-btn >Toggle Sidebar</b-btn> -->

      <i id="sidebar-icon" @click="toggleSidebar" 
          class="fas fa-chevron-circle-right side-toggle-icon" 
          v-if="!sidebarActive">
      </i>

      <i id="sidebar-icon" @click="toggleSidebar" 
          class="fas fa-chevron-circle-left side-toggle-icon" 
          v-else>
      </i>

      <top-navbar></top-navbar>

      <dashboard-content class="dashboard-content"> </dashboard-content>

      <!-- <component :is="selectedComponent" v-if="selectedComponent" /> -->

      <content-footer class="content-footer"
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
      selectedComponent: '',
      sidebarActive: true,
      linkIsActive: true
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
  },
  methods: {
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive
      if(this.sidebarActive) {

        document.getElementById("main-panel").style.marginLeft = "250px"
        document.getElementById("main-panel").style.transition = "0.5s"
        document.getElementById("main-panel").style.width = "calc(100% - 250px)"

        document.getElementById("sidebar-comp").style.display = "inherit"
        document.getElementById("sidebar-comp").style.transition = "0.5s"

        setTimeout(() => {
          document.getElementById("sidebar-comp").style.width = "250px"
        }, 150)
        setTimeout(() => {
          this.linkIsActive = !this.linkIsActive
        }, 325)

        document.getElementById("sidebar-icon").style.transition = "0.5s"
        document.getElementById("sidebar-icon").style.left = "270px"
      } else {

        document.getElementById("main-panel").style.transition = "0.5s"
        document.getElementById("main-panel").style.marginLeft= "0"
        document.getElementById("main-panel").style.width = "100%"

        document.getElementById("sidebar-comp").style.transition = "0.5s"
        document.getElementById("sidebar-comp").style.width = "0"
        setTimeout(() => {
          this.linkIsActive = !this.linkIsActive  
        }, 100)
        setTimeout(() => {
          document.getElementById("sidebar-comp").style.display = "none"
        }, 600)
        
        document.getElementById("sidebar-icon").style.transition = "0.5s"
        document.getElementById("sidebar-icon").style.left = "15px"
      }
    }
  }
}
</script>

<style scoped>
  .main-panel {
    width: calc(100% - 250px);
  }
  .dashboard-content {
    margin-left: 15px;
  }
  .content-footer {
    margin: 0;
    padding: 0;
  }
  .sidebar-comp {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 1s;
    padding-top: 60px;
  }
  .sidebar-comp a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
  .sidebar-comp a:hover {
    color: #f1f1f1;
  }
  .sidebar-comp .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }
  .openbtn {
    font-size: 20px;
    cursor: pointer;
    background-color: #111;
    color: white;
    padding: 10px 15px;
    border: none;
  }
  .openbtn:hover {
    background-color: #444;
  }
  #main-panel {
    transition: margin-left .5s;
    padding: 16px;
  }
  .side-toggle-icon {
    cursor: pointer;
    position: fixed;
    left: 270px;
    z-index: 99;
  }
  .sidebar-item {
    z-index: auto !important;
  }

</style>