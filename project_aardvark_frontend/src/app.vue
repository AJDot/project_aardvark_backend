<template>
  <main id="app">
    <app-header />
    <router-view />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/app-header.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
  },
})
</script>
