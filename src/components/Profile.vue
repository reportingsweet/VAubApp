<template>
  <div>
    <h1>Welcome</h1>
    <button @click="logOut">Log out</button>
    <hr>
    <img
      :src="user.photoURL"
      style="height: 120px"> <br>
    <p>{{ user.displayName }}</p>
    <p>{{ user.email }}</p>
    <hr>
    <h1>Application Data</h1>
    <applicationlist/> <br>
    <hr>
    <h1>User Data</h1>
    <pre>{{ user }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'
import applicationlist from './ApplicationList'
export default {
  components: { applicationlist },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut().then(() => { this.$router.replace({ name: 'Home' }) })
    }
  }
}
// export default {
//   components: { applicationlist },
//   data () {
//     return {
//       photo: '',
//       userId: '',
//       name: '',
//       email: '',
//       user: false
//     }
//   },
//   created () {
//     var vm = this
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         vm.user = user
//         vm.name = vm.user.displayName
//         vm.email = vm.user.email
//         vm.photo = vm.user.photoURL
//         vm.userId = vm.user.uid
//       } else {
//         vm.user = false
//       }
//     })
//   },
//   methods: {
//     logOut () {
//       firebase.auth().signOut().then(() => { this.$router.replace({ name: 'Home' }) })
//     }
//   }
// }

</script>
