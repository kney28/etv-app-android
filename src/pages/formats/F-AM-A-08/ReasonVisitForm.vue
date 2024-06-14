<template>
  <k-reason-visit />
</template>

<script>
import { defineComponent } from 'vue'
import ReasonVisitComponent from 'src/components/ReasonVisit.vue'

export default defineComponent({
  name: 'ReasonVisitForm',
  components: {
    kReasonVisit: ReasonVisitComponent
  }
})
</script>
