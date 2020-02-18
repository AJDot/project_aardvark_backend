<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import AppHeader from '@/components/app-header.vue'

export default Vue.extend({
  name: 'app',
  components: {
    AppHeader,
  },
})
</script>
