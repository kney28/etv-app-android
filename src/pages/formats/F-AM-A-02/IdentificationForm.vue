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
  emits: ['action'],
  setup(props, { emit }) {
    const onAction = (data) => {
      emitAction(data.type, data.data)
    }
    const emitAction = (type, data) => {
      emit('action', { type, data })
    }
    return {
      onAction
    }
  }
})
</script>
