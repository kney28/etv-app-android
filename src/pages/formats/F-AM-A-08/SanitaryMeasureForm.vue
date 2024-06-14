<template>
  <k-sanitary-measure />
</template>

<script>
import { defineComponent } from 'vue'
import SanitaryMeasureComponent from 'src/components/SanitaryMeasure.vue'

export default defineComponent({
  name: 'SanitaryMeasureForm',
  components: {
    kSanitaryMeasure: SanitaryMeasureComponent
  }
})
</script>
