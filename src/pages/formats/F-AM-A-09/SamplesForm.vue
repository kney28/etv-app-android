<template>
  <k-sample-ratio />
</template>

<script>
import { defineComponent } from 'vue'
import SampleRatioComponent from 'src/components/SampleRatio.vue'

export default defineComponent({
  name: 'SamplesForm',
  components: {
    kSampleRatio: SampleRatioComponent
  }
})
</script>
