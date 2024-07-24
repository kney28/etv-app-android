<template>
  <k-reason-visit />
</template>

<script>
import { defineComponent } from 'vue'
import ReasonVisitComponent from 'src/components/ReasonVisit.vue'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'ReasonVisitForm',
  components: {
    kReasonVisit: ReasonVisitComponent
  },
  setup() {
    const principal = usePrincipal()
    principal.currentForm = 7
    return {}
  }
})
</script>
