<template>
  <div class="row q-col-gutter-xs">
    <div v-for="(item, index) in items" :key="index" class="col-xs-12 col-sm-6 col-md-4">
      <q-card>
        <q-card-section>
          <b>{{ item.literal }}</b> {{ item.title }}
        </q-card-section>

        <q-separator />

        <q-card-section class="row justify-center">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <q-input white type="textarea" color="blue" v-model="item.observations" :label="item.labelObs" />
          </div>
          <div>
            <q-radio v-for="(opt, id) in item.options" :key="id" color="teal" :label="opt.label" v-model="item.value"
              :val="opt.val" @update:model-value="(e) => updateValue(e, index, id)" />
            <q-checkbox color="teal" label="CR" v-model="item.cr" val="CR"
              @update:model-value="(e) => updateValue(e, index)" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'

const opts = [
  {
    literal: '1.1',
    title: `El establecimiento esta ubicado en terreno de fácil drenaje, alejado de botaderos de basura, aguas
      estancadas, criaderos de insectos y roedores, plantas de beneficio, cementerios y, en general, a focos de
      insalubridad e inseguridad evitar en las zonas de riesgo, que ofrezcan peligro de inundación, erosión ( Art
      4 Resolución 4445 de 1996) (Art 160, 162,163 Ley 9 de 1979)`,
    observations: null,
    labelObs: 'Hallazgos',
    cr: false,
    value: null,
    options: [
      { label: 'C', val: 3 },
      { label: 'CP', val: 1.5 },
      { label: 'NC', val: 0 }
    ]
  }
]

export default defineComponent({
  name: 'EvaluationOptionsComponent',
  props: {
    items: {
      type: Object,
      required: false,
      default: opts
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    const types = { opt: 'opt', cr: 'cr' }
    const updateValue = (e, index, id = null) => {
      if (id === null) {
        emitAction(types.cr, { index, value: e })
      } else {
        emitAction(types.opt, { index, id, value: e })
      }
    }
    const emitAction = (type, data) => {
      emit('action', { type, data })
    }
    return {
      updateValue
    }
  }
})
</script>
