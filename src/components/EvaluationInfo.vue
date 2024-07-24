<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="row" v-for="(item, index) in items" :key="index">
          <b>{{ item.label }}</b>
          <div>
            {{ item.description }}
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" round v-close-popup label="Ok" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-btn type="button" round size="sm" icon="fa-solid fa-circle-info" color="primary" @click="view()" />
</template>

<script>
import { defineComponent, ref } from 'vue'

const opts = [
  {
    label: 'Aceptable ( A )',
    description: `Marque cuando el establecimiento cumple la totalidad de los requisitos
      descritos en el instructivo para el aspecto a evaluar`
  },
  {
    label: 'Aceptable con requerimiento (AR)',
    description: `Marque cuando el establecimiento cumple parcialmente los requisitos
      descritos en el instructivo para el aspecto a evaluar`
  },
  {
    label: 'Inaceptable (I)',
    description: `Marque cuando el establecimiento no cumple ninguno de los requisitos
      descritos en el instructivo para el aspecto a evaluar`
  },
  {
    label: 'No Aplica (NA)',
    description: `Marque con una X la casilla "NA" en caso que el aspecto a verificar no
    se realice por parte del establecimiento y calificar como Aceptable (A).
    Justificar la razón del no aplica en el espacio de hallazgos.`
  },
  {
    label: 'Crítico (C)',
    description: `Marque la casilla "C" cuando el incumplimiento del aspecto a verificar
      afecte la inocuidad de los alimentos y deba aplicar Medida Sanitaria
      de seguridad que impida que el establecimiento continue ejerciendo sus labores`
  }
]

export default defineComponent({
  name: 'EvaluationInfoComponent',
  props: {
    items: {
      type: Object,
      required: false,
      default: opts
    }
  },
  emits: ['action'],
  setup() {
    const dialog = ref(false)
    const view = () => {
      dialog.value = true
    }
    return {
      dialog,
      view
    }
  }
})
</script>
