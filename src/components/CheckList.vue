<template>
  <div class="row q-col-gutter-xs">
    <q-list>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-item v-for="(item, index) in items" :key="index" tag="label" v-ripple>
          <q-item-section avatar top>
            <q-checkbox color="teal" v-model="item.value" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>
              {{ item.description }}
              <q-input v-if="item.hasOwnProperty('observations')" white type="textarea" color="blue"
                v-model="item.observations" :label="item.labelInput" lazy-rules
                :rules="[val => val.length <= 100 || 'El campo es de maximo 100 caracteres']" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

const opts = [
  {
    title: 'Título',
    description: 'Descripción',
    observations: null,
    value: false
  },
  {
    title: 'Título',
    description: 'Descripción',
    value: true
  }
]

export default defineComponent({
  name: 'CheckListComponent',
  props: {
    items: {
      type: Object,
      required: false,
      default: opts
    }
  }
})
</script>
