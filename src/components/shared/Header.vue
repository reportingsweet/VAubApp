<template>  
  <b-navbar toggleable="md" type="light" variant="light" fixed="top" id="cust-head">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand>
      <h3 class="md-title" style="flex: 1;color:#495057 !important;">Reporting</h3>
    </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto" v-if="isLoggedIn">
            <b-nav-item-dropdown right>
              <template slot="button-content">
                <em>{{ currentUser }}</em>
              </template>
                <b-dropdown-item @click="logOut">Signout</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>

        </b-collapse>

    
        
  </b-navbar>
</template>

<script>
  import { router } from '@/main'
  const self = this;
// import { firebase } from '@/main'

// const currentUser = firebase.auth().currentUser
// const isLoggedIn = currentUser?true:false

export default {
  data () {
    return {
        currentPath: '',
        isLoggedIn: true,
        currentUser: 'vaubrey@mail.com', //firebase.auth().currentUser?firebase.auth().currentUser.email:''
        movie: ''
    }
  },
  beforeCreate () {
      // console.log(window.location.pathname)
      this.currentPath = window.location.pathname
      this.currentUser = 'vaubrey@mail.com', //firebase.auth().currentUser?firebase.auth().currentUser.email:''
      this.currentPath=='/Login'? this.isLoggedIn = false : ''
      // console.log(firebase.auth().currentUser.email)
      // console.log(this.currentPath==='/login')
  },
  mount() {
    this.currentPath = window.location.pathname
  },
  methods: {
    logOut () {
      // firebase.auth().signOut().then(() => {
        console.log("Signing Out...")
        // this.$router.go('/Login')
        // this.$router.push({name: 'Login'})
        // router.push('/Login')
        this.$router.push('/')
        this.currentUser = ''

      // })
      // this.currentUser = ''
    }
  }
  ,
  watch: {
    $route (to, from) {
      // console.log(window.location.pathname)
      // console.log(firebase.auth().currentUser)
      // console.log(isLoggedIn)

      // if (firebase.auth().currentUser) {
      if (this.currentUser) {
        this.isLoggedIn = true
        this.currentUser = 'vaubrey@mail.com' //firebase.auth().currentUser?firebase.auth().currentUser.email:''
        // console.log(this.isLoggedIn)
      } else {
        this.isLoggedIn = false
        // console.log(this.isLoggedIn)
      }
    }
  }

}

</script>

<style>

  em { 
    color: black;
  }

  a:hover {
    color: black !important;
  }

</style>