import { DirectiveOptions } from 'vue'

export default {
  inserted: function (el, binding, node) {
    // Focus the element
    if (binding.value === undefined || binding.value === true) {
      el.focus()
    }
  },
} as DirectiveOptions
