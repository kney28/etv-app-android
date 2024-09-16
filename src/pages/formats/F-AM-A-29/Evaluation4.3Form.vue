<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect4C" @action="onAction" />
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
    const { ['aspect4.3']: aspect4C } = storeToRefs(useFAMA29())
    const principal = usePrincipal()
    principal.currentForm = 6

    const onAction = (val) => {
      if (val.type === 'na') {
        aspect4C.value[val.data.index].value = aspect4C.value[val.data.index].options[0].val
      }
    }

    return {
      onAction,
      aspect4C,
    }
  }
})
</script>
