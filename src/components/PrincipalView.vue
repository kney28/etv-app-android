<template>
  <k-header :title="principal.headerTitle" :content="principal.headerContent" />
  <q-separator class="q-mb-md" />
  <k-group-cards :cardElements="principal.cardElements" @action="action" />
  <k-dialog-tree :nodes="principal.nodes" :dialog="principal.visibleDialogTree" @action="action" />
  <q-separator></q-separator>
  <k-table :data="principal.tableData" :columns="principal.tableColumns" @action="action" />
  <q-btn class="q-pa-lg" color="secondary" icon-right="check" label="change color"
    @click="() => principal.visibleDialogTree = true" />
  <k-dialog :visible="principal.visibleDialog" type="ok" :banner="true" @action="action">
    <template v-slot:body>
      <slot name="content"></slot>
    </template>
  </k-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { usePrincipal } from 'stores/principal'
// import { useGroupCards } from 'stores/groupCards'
// import { useDialogTree } from 'stores/dialogTree'
import HeaderComponent from 'src/components/Header.vue'
import GroupCardsComponent from 'src/components/GroupCards.vue'
import DialogTreeComponent from 'src/components/DialogTree.vue'
import DialogComponent from 'src/components/Dialog.vue'
import TableComponent from 'src/components/TableComponent.vue'

export default defineComponent({
  name: 'F-EV-04Page',
  components: {
    kHeader: HeaderComponent,
    kGroupCards: GroupCardsComponent,
    kDialogTree: DialogTreeComponent,
    kDialog: DialogComponent,
    kTable: TableComponent
  },
  props: {
    config: {
      type: Object,
      required: false
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    const principal = usePrincipal()
    // const groupCards = useGroupCards()
    // const dialogTree = useDialogTree()
    const action = (e) => {
      switch (e.type) {
        case 'hiddenDialogTree':
          principal.visibleDialogTree = false
          break
        case 'hiddenDialog':
          principal.visibleDialog = false
          break
        case 'selectNode':
          principal.visibleDialog = true
          break
        case 'showTree':
          console.log(e)
          break
        default:
          break
      }
      //emitAction(e.type, e.data)
    }

    const emitAction = (type, data) => {
      emit('action', { type, data })
    }

    return {
      principal,
      // groupCards,
      // dialogTree,
      action
    }
  }
})
</script>