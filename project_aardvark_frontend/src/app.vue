<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import AppHeader from '@/components/app-header.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
  },
})
</script>
