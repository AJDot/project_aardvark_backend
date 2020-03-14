<script lang="ts">
import Vue from 'vue'
import { Slates } from '@/interfaces/slates/item'

export default Vue.extend({
  name: 'SlateItem',
  props: {
    item: {
      type: Object as () => Slates.IItem,
      required: true,
    },
  },
  data: function () {
    return {}
  },
})
</script>

<template>
  <div>
    {{ item.description }}
  </div>
</template>
