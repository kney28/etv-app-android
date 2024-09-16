<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect4B" @action="onAction" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA29 } from 'src/stores/F-AM-A-29'
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
    const { ['aspect4.2']: aspect4B } = storeToRefs(useFAMA29())
    const principal = usePrincipal()
    principal.currentForm = 5

    const onAction = (val) => {
      if (val.type === 'na') {
        aspect4B.value[val.data.index].value = aspect4B.value[val.data.index].options[0].val
      }
    }

    return {
      onAction,
      aspect4B,
    }
  }
})
</script>
