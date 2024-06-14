<template>
  <k-entity-ident @filter="onAction" />
</template>

<script>
import { defineComponent } from 'vue'
import EntityIdentComponent from 'src/components/EntityIdentification.vue'

export default defineComponent({
  name: 'FormElement',
  components: {
    kEntityIdent: EntityIdentComponent
  },
  setup() {
    const onAction = () => {
      console.log('estoy filtrando')
    }
    return {
      onAction
    }
  }
})
</script>
