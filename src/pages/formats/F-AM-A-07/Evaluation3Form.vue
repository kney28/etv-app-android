<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect3" @action="onAction" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA07 } from 'src/stores/F-AM-A-07'
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
    const { aspect3 } = storeToRefs(useFAMA07())
    const principal = usePrincipal()
    principal.currentForm = 3

    const onAction = (val) => {
      if (val.type === 'na') {
        aspect3.value[2].value = aspect3.value[2].options[0].val
      }
    }
    return {
      onAction,
      aspect3,
    }
  }
})
</script>
