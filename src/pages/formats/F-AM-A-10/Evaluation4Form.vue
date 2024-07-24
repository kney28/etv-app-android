<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect4" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA10 } from 'src/stores/F-AM-A-10'
import { usePrincipal } from 'src/stores/principal'
import { storeToRefs } from 'pinia'
import EvaluationOptionsComponent from 'src/components/EvaluationOptions.vue'
import EvaluationInfoComponent from 'src/components/EvaluationInfo.vue'

export default defineComponent({
  name: 'Evaluation1Form',
  components: {
    kEvaluation: EvaluationOptionsComponent,
    kEvaluationInfo: EvaluationInfoComponent
  },
  emits: ['action'],
  setup() {
    const { aspect4 } = storeToRefs(useFAMA10())
    const principal = usePrincipal()
    principal.currentForm = 4

    return {
      aspect4,
    }
  }
})
</script>
