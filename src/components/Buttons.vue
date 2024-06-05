<template>
  <!-- Button create -->
  <q-btn v-if="type === 'create'" unelevated rounded icon="add" color="primary" @click="create()" label="Agregar" />
  <!-- Button edit -->
  <q-btn v-if="type === 'edit'" round size="xs" color="primary" icon="border_color" v-on:click="edit()" />
  <!-- Button submit -->
  <q-btn v-if="type === 'submit'" round icon="save" @click.prevent="submit()" color="primary" />
  <!-- <q-tooltip v-if="type === 'submit'">Guardar datos</q-tooltip> -->
  <!-- Button update -->
  <q-btn v-if="type === 'update'" round icon="edit" @click.prevent="update()" color="primary" />
  <!-- <q-tooltip v-if="type === 'update'">Editar datos</q-tooltip> -->
  <!-- Button delete -->
  <q-btn v-if="type === 'delete'" round size="xs" color="negative" icon="delete_forever" @click="onDelete()" />
  <!-- Button check -->
  <q-btn v-if="type === 'check'" round icon="check" @click.prevent="add()" color="secondary" />
  <!-- Button cancel -->
  <q-btn v-if="type === 'cancel'" round icon="cancel" v-close-popup color="negative" />
  <!-- <q-tooltip v-if="type === 'cancel'">Cancelar</q-tooltip> -->
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButtons',
  props: {
    permission: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    useEmit: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ['action'],
  setup (props, { emit }) {
    const onDelete = () => {
      if (props.useEmit) {
        emit('action')
      }
    }

    const edit = () => {
      if (props.useEmit) {
        emit('action')
      }
    }

    const create = () => {
      if (props.useEmit) {
        emit('action')
      }
    }

    const submit = () => {
      if (props.useEmit) {
        emit('action')
      }
    }

    const update = () => {
      if (props.useEmit) {
        emit('action')
      }
    }

    const add = () => {
      if (props.useEmit) {
        emit('action')
      }
    }

    return {
      onDelete,
      edit,
      create,
      submit,
      update,
      add
    }
  }
})
</script>
