<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-separator class="q-mt-md q-mb-md" />
    <div class="text-h6 text-weight-light">Listado de visitas no sincronizadas</div>
    <q-separator class="q-mt-md q-mb-md" />
    <ktable title="" class="my-sticky-header-table" :data="share.tableData" :columns="share.tableColumns"
      @action="action" />
    <q-separator class="q-mt-md q-mb-md" />
    <q-btn label="Compartir" size="md" icon="fa-solid fa-share-nodes" color="positive" @click="action('share')" />
  </q-page>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TableComponent from 'src/components/TableComponent.vue'
import { useShare } from 'src/stores/share'
import { onMounted } from 'vue'
import { useMediator } from 'src/stores/mediator'

export default defineComponent({
  name: 'SharePage',
  components: {
    ktable: TableComponent
  },

  setup() {
    const share = useShare()
    const { staticRouteHandler, buttonHandler } = useMediator()

    onMounted(() => {
      staticRouteHandler!.onAction('Load_Share', null)
    })
    const action = (data: any) => {
      if (data === 'share') {
        buttonHandler!.onAction('Share', null)
      }
      console.log(data)
    }
    return {
      share,
      action
    }
  }
})
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #42a5f5

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>