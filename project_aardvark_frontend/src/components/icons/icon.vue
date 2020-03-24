<script lang="ts">
import Vue from 'vue'
import { Hash } from '@/interfaces/basic'
import tagMixin from '@/mixins/tagMixin'

export default Vue.extend({
  name: 'Icon',
  props: {
    ...tagMixin('span').props,
    icon: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {}
  },
  computed: {
    bindings (): Hash {
      const binds: Hash = {
        class: `icon ${this.icon}`,
      }
      if (this.tag === 'button') {
        binds.type = 'button'
      }
      return binds
    },
  },
})
</script>

<template>
  <component
    :is="tag"
    v-bind="bindings"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>
