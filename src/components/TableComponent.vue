<template>
  <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
    title="Asientos contables" :rows="data" :filter="filter" :columns="columns" row-key="name">
    <template v-slot:top-left>
      <btn type="create" permission="A" @action="create()" />
      <q-space />
    </template>
    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
        <q-th v-if="detail" auto-width>Detalle</q-th>
        <q-th auto-width>Editar</q-th>
        <q-th auto-width>Eliminar</q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
        <q-td v-if="detail" auto-width class="text-center">
          <q-btn size="sm" color="accent" round dense />
        </q-td>
        <q-td auto-width class="text-center">
          <btn type="edit" @action="edit(props.row, props.rowIndex)" permission="A" />
        </q-td>
        <q-td auto-width class="text-center">
          <btn type="delete" @action="onDelete(props.row, props.rowIndex)" permission="A" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import onSubmit from 'src/components/OnSubmit.vue'
// import onEditing from 'src/components/OnEditing.vue'
import btn from 'src/components/Buttons.vue'

export default defineComponent({
  name: 'TableComponent',
  components: {
    // onSubmit,
    // onEditing,
    btn
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Boolean,
      default: false,
      required: false
    },
    useEmit: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    // console.log(props.data)
    const filter = ref('')
    const pagination = ref({
      rowsPerPage: 10
    })

    const emitAction = (type, data) => {
      if (props.useEmit) {
        emit('action', { type, data })
      }
    }

    const create = () => {
      emitAction('create', true)
    }
    const edit = (row, index) => {
      const obj = {
        data: row,
        state: true,
        rowIndex: index
      }
      console.log(row)
      emitAction('edit', obj)
    }
    const onDelete = (row, index) => {
      const obj = {
        data: row,
        rowIndex: index
      }
      emitAction('delete', obj)
    }

    return {
      filter,
      pagination,
      create,
      edit,
      onDelete
    }
  }
})
</script>
