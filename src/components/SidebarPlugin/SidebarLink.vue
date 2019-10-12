<template>

  <md-list-item @click="hideSidebar"
                v-bind="$attrs"
                >
    <slot>
      <md-icon class="link-icon">{{link.icon}}</md-icon>
      <p class="link-name" >{{link.name}}</p>
    </slot>
  </md-list-item>
  
</template>
<script>
export default{
  inject: {
    autoClose: {
      default: true
    }
  },
  props: {
    link: {
      type: [String, Object],
      default: () => {
        return {
          name: '',
          path: '',
          icon: ''
        }
      }
    },
    tag: {
      type: String,
      default: 'router-link'
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    hideSidebar () {
      if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
        this.$sidebar.displaySidebar(false)
      }
    }
  }
}
</script>
<style>


</style>
