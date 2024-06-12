<template>
  <q-dialog :model-value="dialog" @update:model-value="show" position="bottom">
    <q-card style="min-width: 90vw; max-width: 90vw; max-height: 50vh">
      <q-card-section class="row items-center q-pt-xs q-pb-xs bg-purple fixed-section">
        <div class="text-bold text-white">{{ title }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <k-tree :nodes="nodes" @action="action" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Tree from 'src/components/Tree.vue'

export default defineComponent({
  name: 'DialogTreeComponent',
  components: {
    kTree: Tree
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Cabecera'
    },
    nodes: {
      type: Array,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    const emitAction = (type: string, data: any) => {
      emit('action', { type, data })
    }
    const action = (node: string) => {
      emitAction('selectNode', node)
    }
    const show = () => {
      emitAction('hiddenDialogTree', null)
    }

    return {
      action,
      show
    }
  }
})
</script>
<style>
.fixed-section {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
