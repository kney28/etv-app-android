<template>
  <div class="row justify-end q-mb-md">
    <k-evaluation-info />
  </div>
  <k-evaluation :items="aspect6" @action="onAction" />
</template>

<script>
import { defineComponent } from 'vue'
import { useFAMA02 } from 'src/stores/F-AM-A-02'
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
    const { aspect6 } = storeToRefs(useFAMA02())
    const principal = usePrincipal()
    principal.currentForm = 6

    const onAction = (val) => {
      if (val.type === 'na') {
        aspect6.value[0].value = aspect6.value[0].options[0].val
      }
    }

    return {
      onAction,
      aspect6,
    }
  }
})
</script>
