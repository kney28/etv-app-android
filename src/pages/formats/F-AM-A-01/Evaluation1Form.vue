<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect1" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA01 } from 'src/stores/F-AM-A-01'
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
    const { aspect1 } = storeToRefs(useFAMA01())
    const principal = usePrincipal()
    principal.currentForm = 1

    return {
      aspect1
    }
  }
})
</script>
