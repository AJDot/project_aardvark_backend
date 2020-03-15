<script lang="ts">
import Vue from 'vue'
import SlateItem from '@/models/slateItem'

export default Vue.extend({
  name: 'SlateItem',
  props: {
    item: {
      type: Object as () => SlateItem,
      required: true,
    },
  },
  data: function () {
    return {}
  },
  methods: {
    async destroy () {
      await this.$store.dispatch('slateItems/destroy', { slateItem: this.item })
    },
  },
})
</script>

<template>
  <div>
    <label
      :for="`item-${item.id}`"
      class="sr-only"
    />
    <input
      :id="`item-${item.id}`"
      v-model="item.description"
      type="text"
      autocomplete="off"
      class="input"
    >
    <button
      type="button"
      @click.stop="destroy"
    >
      x
    </button>
  </div>
</template>
