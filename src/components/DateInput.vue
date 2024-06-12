<template>
  <q-input label="Fecha" filled v-model="date" @update:model-value="onAction" mask="date" :rules="['date']">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DateInputComponent',
  emits: ['update:model'],
  setup(props, { emit }) {
    const date = ref('2019/04/10')
    const onAction = (event: string | number | null) => {
      emit('update:model', event)
    }
    return {
      date,
      onAction
    }
  }
})
</script>
