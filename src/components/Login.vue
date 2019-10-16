<template>
  <div class="login">
    <div style="width: 500px; margin: auto;">
      <div>
        <h1 style="text-align: left;">ReportingSweet</h1>
      </div>
       <h4 style="text-align: left;">Login</h4> 
    </div>
    <b-card class="login-card">
      <div class="login-form">
        <b-form-group class="mb-0">
          <b-form-input type="text" placeholder="Enter your username" v-model="userName" /><br>
          <b-form-input @keyup.enter="login" type="password" placeholder="Password" v-model="password" /><br>
          <b-btn @click="login">Login</b-btn>
          <!-- <b-btn @click="isUserSignedIn">Check User</b-btn> -->
          <b-btn @click="signOut">Signout</b-btn>
        </b-form-group>
        <br>
        <div>{{ loginErrorMsg }}</div>
      </div>  
    </b-card> 
    <!-- <amplify-sign-out></amplify-sign-out> -->
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: '',
      waitMsg: false,
      signedIn: false,
      loginErrorMsg: '',
      signInConfig: {
        header: "Sign In",
        username: ''
      }
    }
  },

  beforeCreate () {
    document.title = 'Reporting Sweet'
  },

  created() {
    AmplifyEventBus.$on('authState', info => {
      if(info === 'signedIn') this.signedIn = true
    })
  },
  methods: {

    isUserSignedIn () {
      var userObj = Auth.currentAuthenticatedUser()

      console.log(userObj)
    },

    login () {

      Auth.signIn(this.userName, this.password)
        .then(response => { 
          console.log("signIn response", response)
          if(response) {
            this.$store.dispatch('setCurrentUser', { username: response.username })
            this.$router.push('/Dash')
          }
        })
        .catch(error => { 
          console.log("signIn Error:", error) 
          if(error.message) this.loginErrorMsg = error.message  
          else this.loginErrorMsg = error  
        })


    },
    signOut() {
      Auth.signOut({ global: true })
        .then(response => { 
          console.log("signOut response", response)
          if(!response) {
            this.userName = ''
            this.password = ''
            this.loginErrorMsg = ''
            this.signedIn = false
          } 
        })
        .catch(err => console.log("signOut Error:", err));
    }
  }
}
</script>

<style scoped>
  .login {
    margin-top:40px;
    font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif;
  }

  .loader {
      animation: spin 1.5s linear infinite;
  }
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }

  .login-card {
    width: 500px;
    /* height: 200px; */
    margin: auto;
  }

  .login-form {
    margin: auto;
  }
</style>