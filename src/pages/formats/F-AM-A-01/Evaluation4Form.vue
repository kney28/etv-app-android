<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect4" @action="onAction" />
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
    const { aspect4 } = storeToRefs(useFAMA01())
    const principal = usePrincipal()
    principal.currentForm = 4

    const onAction = (val) => {
      if (val.type === 'na') {
        aspect4.value[3].value = aspect4.value[3].options[0].val
      }
    }

    return {
      onAction,
      aspect4,
    }
  }
})
</script>
