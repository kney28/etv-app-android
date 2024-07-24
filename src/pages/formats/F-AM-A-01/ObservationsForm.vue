<template>
  <k-observations />
</template>

<script>
import { defineComponent } from 'vue'
import GeneralObservationsComponent from 'src/components/GeneralObservations.vue'

export default defineComponent({
  name: 'ConceptForm',
  components: {
    kObservations: GeneralObservationsComponent
  }
})
</script>
