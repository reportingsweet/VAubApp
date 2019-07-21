<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
       <img class="img" :src="cardUserImage">
    </div>

    <md-card-content>
      <h6 class="category text-gray">Attorney at Law</h6>
      <h4 class="card-title">Vinnie Aubrey</h4>
      <p class="card-description">
     </p>
      <md-button class="md-round md-success">Follow</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: 'user-card',
  props: {
    cardUserImage: {
      type: String,
      default: require('@/assets/img/faces/vinnie.jpg')
    }
  },
  data () {
    return {
    }
  }
}

</script>
<style>

</style>
