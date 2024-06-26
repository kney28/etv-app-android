<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect5" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA02 } from 'src/stores/F-AM-A-02'
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
    const { aspect5 } = useFAMA02()
    const principal = usePrincipal()
    principal.currentForm = 5
    return {
      aspect5,
    }
  }
})
</script>
