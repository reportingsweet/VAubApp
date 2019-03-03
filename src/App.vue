<template>
  <div id="app">
    <appHeader />
    <appPageHeader />

    <router-view/>
  </div>
</template>

<script>

import PageHeader from '@/components/shared/PageHeader'
import Header from '@/components/shared/Header'

export default {
  data() {
    return {
      name: 'App'
    }
  },
  components: {
    
    appPageHeader: PageHeader,
    appHeader: Header
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 10px; */
}
</style>
