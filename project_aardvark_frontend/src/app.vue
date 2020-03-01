<template>
  <main id="app">
    <app-header />
    <router-view />
    <edit-slate />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/app-header.vue'
import EditSlate from '@/components/slates/edit.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    EditSlate,
  },
})
</script>
