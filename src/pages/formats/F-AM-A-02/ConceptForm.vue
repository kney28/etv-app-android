<template>
  <k-sanitary-concept />
</template>

<script>
import { defineComponent } from 'vue'
import SanitaryConceptComponent from 'src/components/SanitaryConcept.vue'

export default defineComponent({
  name: 'ConceptForm',
  components: {
    kSanitaryConcept: SanitaryConceptComponent
  }
})
</script>
