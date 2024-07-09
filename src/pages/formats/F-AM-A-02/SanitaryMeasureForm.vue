<template>
  <k-sanitary-measure />
</template>

<script>
import { defineComponent } from 'vue'
import SanitaryMeasureComponent from 'src/components/SanitaryMeasure.vue'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'SanitaryMeasureForm',
  components: {
    kSanitaryMeasure: SanitaryMeasureComponent
  },
  setup() {
    const principal = usePrincipal()
    principal.currentForm = 7
    return {}
  }
})
</script>
