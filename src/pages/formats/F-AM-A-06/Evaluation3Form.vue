<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect3" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA06 } from 'src/stores/F-AM-A-06'
import { usePrincipal } from 'src/stores/principal'
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
    const { aspect3 } = useFAMA06()
    const principal = usePrincipal()
    principal.currentForm = 3
    return {
      aspect3,
    }
  }
})
</script>
