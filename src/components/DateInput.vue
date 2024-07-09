<template>
  <q-input label="Fecha" v-model="entity.fechaRealizacion" mask="date" :rules="['date']">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="entity.fechaRealizacion">
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
import { useEntityIdentification } from 'src/stores/principal'

export default defineComponent({
  name: 'DateInputComponent',
  emits: ['update:model'],
  setup(props, { emit }) {
    const entity = useEntityIdentification()

    return {
      entity
    }
  }
})
</script>
