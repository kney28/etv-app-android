<template>
  <q-tree :nodes="nodes" dense selected-color="primary" node-key="code" v-model:selected="selected"
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

    function findNodeByCode(nodes, code) {
      for (const node of nodes) {
        if (node.code === code) {
          return node;
        }
        if (node.children) {
          const found = findNodeByCode(node.children, code);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }

    const action = (node) => {
      const result = findNodeByCode(props.nodes, node)
      emit('action', result.id)
    }

    return {
      selected,
      expanded,
      action
    }
  }
})
</script>
