<template>  
  <b-navbar toggleable="md" type="light" variant="light" fixed="top" id="cust-head" v-if="isLoggedIn">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand>
      <h3 class="md-title" style="flex: 1;color:#495057 !important;">ReportingSweet</h3>
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
  import { Auth } from 'aws-amplify'
  import { AmplifyEventBus } from 'aws-amplify-vue'

  import { router } from '@/main'

  import { mapGetters } from 'vuex'

export default {
  data () {
    return {
        currentPath: '',
        isLoggedIn: false,
        movie: ''
    }
  },
  beforeCreate () {
      // console.log(window.location.pathname)
      this.currentPath = window.location.pathname
      this.currentPath=='/Login'? this.isLoggedIn = false : ''

  },
  mount() {
    this.currentPath = window.location.pathname
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  methods: {
    logOut () {
       console.log("Signing Out...")
       Auth.signOut({ global: true })
        .then(response => {
          console.log("signOut response", response)
          if(!response) { 
            this.$store.dispatch('setCurrentUser', { username: '' })
            this.isLoggedIn = false
            this.$router.push('/Login')
          }
        })
        .catch(err => console.log("signOut Error:", err));
    }
  }
  ,
  watch: {
    $route (to, from) {

      if (this.currentUser) {
        this.isLoggedIn = true
        // this.currentUser = 'vaubrey@mail.com' 
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
  
  #cust-head {
    box-shadow: 0 1px 6px lightgray;
  }
</style>