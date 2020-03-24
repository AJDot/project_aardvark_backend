<script lang="ts">
import Vue from 'vue'
import { Slates } from '@/interfaces/slates/item'
import tagMixin from '@/mixins/tagMixin'

export default Vue.extend({
  name: 'SlateItem',
  mixins: [
    tagMixin(),
  ],
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
  <component :is="tag">
    {{ item.description }}
  </component>
</template>
