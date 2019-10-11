<template>

  <md-toolbar md-elevation="0" style="position:fixed; z-index: 99; background-color: #E5E5E5 !important;">
      <h3 class="md-title" style="flex: 1;color:#495057 !important;">Reporting</h3>

      <p style="margin:0; color:#495057 !important;margin-right: 10px;">crol@mail.com</p>

     
        <md-button class="md-icon-button md-arrow" style="background-color: #E5E5E5 !important;color:#17202A !important;" >
        
          <md-icon style="color:#495057 !important;background-color: #E5E5E5 !important;">keyboard_arrow_down</md-icon>
          
        </md-button>
        <md-list-item  class="dropdown">
            <drop-down>
              <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
        
            
                <p class="hidden-lg hidden-md">Notifications</p>

              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li><a href="#">Mike John responded to your email</a></li>
                <li><a href="#">You have 5 new tasks</a></li>
                <li><a href="#">You're now friend with Andrew</a></li>
                <li><a href="#">Another Notification</a></li>
                <li><a href="#">Another One</a></li>
              </ul>
            </drop-down>
        </md-list-item>
         
     
  </md-toolbar>


<!-- <div> -->
  <!-- <md-toolbar>
      <h3 class="md-title" style="flex: 1">Title</h3>
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-toolbar> -->
<!-- </div> -->

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
.md-title {
  font-size: 20px !important;
  
}
/* .md-arrow {
  box-shadow: none !important;
} */
.md-arrow:hover {
  box-sizing: 1px !important;
}
</style>