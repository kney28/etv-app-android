<template>
  <k-check-list :items="documentaryReview" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFAMA29 } from 'src/stores/F-AM-A-29'
import { usePrincipal } from 'src/stores/principal'
import { storeToRefs } from 'pinia'
import CheckListComponent from 'src/components/CheckList.vue'
import { FormName } from 'src/modules/handlerApp/Director'

export default defineComponent({
  name: 'DocumentaryReview',
  components: {
    kCheckList: CheckListComponent
  },
  setup() {
    const { documentaryReview } = storeToRefs(useFAMA29())
    const principal = usePrincipal()
    principal.currentForm = FormName.EMPTY

    return {
      documentaryReview
    }
  }
})
</script>
