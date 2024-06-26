<template>
  <k-header :title="principal.headerTitle" :content="principal.headerContent" />
  <q-separator class="q-mb-md" />
  <q-btn color="secondary" icon="save" label="Guardar" />
  <q-separator class="q-mb-md q-mt-md" />
  <k-group-cards :cardElements="principal.cardElements" @action="action" />
  <q-separator class="q-mt-md q-mb-md" />
  <k-table :data="principal.tableData" :columns="principal.tableColumns" @action="action" />
  <!-- <q-btn class="q-pa-lg" color="secondary" icon-right="check" label="change color"
    @click="() => principal.visibleDialogTree = true" /> -->
  <k-dialog-tree :nodes="principal.nodes" :title="principal.titleDialogTree" :dialog="principal.visibleDialogTree"
    @action="action" />
  <k-dialog :visible="principal.visibleDialog" type="check" :progress="principal.progressBar" :banner="true"
    @action="action">
    <template v-slot:body>
      <slot name="content"></slot>
    </template>
  </k-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { usePrincipal } from 'src/stores/principal'
import { useMediator } from 'src/stores/mediator'
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
    const { buttonHandler } = useMediator()
    const emitAction = (type: string, data: any) => {
      emit('action', { type, data })
    }
    const action = (e: { [key: string]: any }) => {
      switch (e.type) {
        case 'hiddenDialogTree':
          principal.visibleDialogTree = false
          break
        case 'hiddenDialog':
          principal.visibleDialog = false
          break
        case 'selectNode':
          emitAction('selectNode', e.data)
          principal.visibleDialog = true
          break
        case 'showTree':
          console.log(e)
          buttonHandler!.onAction('ShowTree', e.data)
          break
        case 'Save':
          buttonHandler!.onAction('Save', null)
          break
        case 'check':
          buttonHandler!.onAction('Check', null)
          break
        case 'close':
          buttonHandler!.onAction('Close', null)
        default:
          break
      }
    }

    return {
      buttonHandler,
      emitAction,
      principal,
      action
    }
  }
})
</script>
