<template>
  <div class="login">
      <b-row>
        <b-col sm="4" id="group">
          <!-- <img src="../assets/apartmentslogo.png" style="margin: auto;"/> -->
          <h3>Please Login</h3>
          <b-form-group class="mb-0">
              <b-form-input type="text" placeholder="Email" v-model="email" /><br>
              <b-form-input @keyup.enter="login" type="password" placeholder="Password" v-model="password" /><br>
              <b-btn @click="login">Login</b-btn>
          </b-form-group>
        </b-col>
      </b-row>
      <br>
      <b-row>
          <!-- -->
          <b-col v-if="waitMsg" >
              <!-- <p style="text-align:left;" ><img class="loader" src="../assets/img/wait-symbol.jpg" style="height:20px;width:20px;"/></p> -->
              <p><i style="font-size: 50px;" class="fas fa-spinner loader"></i></p>

          </b-col>
        
      </b-row>    
      <b-row>
          <b-col>
              <a v-if="waitMsg">Please wait while Dash loads</a>
              <!-- <a>Please wait while Dash loads</a> -->
          </b-col>        
      </b-row>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      waitMsg: false
    }
  },

  beforeCreate () {
    document.title = 'Reporting Sweet'
  },
  methods: {

    login () {
    //   firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(

    //     user => {
    //       alert('You are now logged in!')
    //       this.$router.replace('/')
    //     },
    //     err => {
    //       alert('Username or password is incorrect.')
    //     }
        
    //   )
    //   firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        // if(this.password == '1234' && this.email == 'vaubrey@mail.com') {
        if(this.password == '') {
          this.waitMsg = true
          this.$forceUpdate()
          alert('You are now logged in!')
          
          setTimeout(() => {this.$router.replace('/Dash')}, 200)

        
        } else {
             alert('Username or password is incorrect.')
        }
       
    
        
    //   )

    }
  }
}
</script>

<style scoped>
#group {
  min-width: 500px;
  margin: auto;
}
.login {
  margin-top:40px;
  font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif;
}
b-form-input {
  margin: 10px 0;
  /* width: 10%; */
  cursor: pointer;
}
b-btn {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}

.loader {
    animation: spin 1.5s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>