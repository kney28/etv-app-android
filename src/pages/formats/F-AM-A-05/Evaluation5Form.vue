<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect5" @action="onAction" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA05 } from 'src/stores/F-AM-A-05'
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
    const { aspect5 } = storeToRefs(useFAMA05())
    const principal = usePrincipal()
    principal.currentForm = 5

    const onAction = (val) => {
      if (val.type === 'na') {
        aspect5.value[1].value = aspect5.value[1].options[0].val
      }
    }

    return {
      aspect5,
      onAction
    }
  }
})
</script>
