<template>
  <q-tree :nodes="nodes" dense selected-color="primary" node-key="id" v-model:selected="selected"
    v-model:expanded="expanded" @update:selected="action" />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TreeComponent',
  props: {
    nodes: {
      type: Array,
      required: true
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    const selected = ref(null)
    const expanded = ref([])

    const action = (node) => {
      emit('action', node)
    }

    return {
      selected,
      expanded,
      action
    }
  }
})
</script>