<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect5" @action="onAction" />
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
    const { aspect5 } = storeToRefs(useFAMA29())
    const principal = usePrincipal()
    principal.currentForm = 8

    const onAction = (val) => {
      console.log(val, val.data.index)
      if (val.type === 'na') {
        aspect5.value[val.data.index].value = aspect5.value[val.data.index].options[0].val
      }
    }

    return {
      aspect5,
      onAction
    }
  }
})
</script>
