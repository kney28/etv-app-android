<template>
  <div class="col-md-4 col-sm-6 col-xs-12">
    <q-option-group v-model="general.motivoVisita" :options="options" color="teal" />
  </div>
  <div v-if="!disabled" class="col-md-4 col-sm-6 col-xs-12">
    <q-input label="Especifique" type="textarea" :readonly="disabled" white color="blue"
      v-model="general.motivoVisitaEsp" :rules="[val => val.length <= 100 || 'El campo es de maximo 100 caracteres']" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useGeneralities, usePrincipal } from 'src/stores/principal'

const opts = [
  { 'label': 'Programación', 'value': 'PROGRAMACION' },
  { 'label': 'Solicitud del interesado', 'value': 'INTERESADO' },
  { 'label': 'Asociada a peticiones, quejas y reclamos', 'value': 'QUEJAS-RECLAMOS' },
  { 'label': 'Solicitud oficial', 'value': 'SOLICITUD-OFICIAL' },
  { 'label': 'Evento de interés en salud pública', 'value': 'EVENTO-INTERES' },
  { 'label': 'Solicitud de práctica de pruebas/procesos sancionatorios ADMIN', 'value': 'SOLICITUD-PRACTICA' },
  { 'label': 'Otro', 'value': 'OTRO' }
]

export default defineComponent({
  name: 'ReasonVisitComponent',
  props: {
    options: {
      type: Object || Array,
      required: false,
      default: opts
    }
  },
  emits: ['action'],
  setup() {
    const general = useGeneralities()
    const disabled = ref(false)
    const principal = usePrincipal()
    watchEffect(() => {
      if (general.motivoVisita === 'OTRO') {
        disabled.value = false
      } else {
        disabled.value = true
        general.motivoVisitaEsp = ''
      }
    })

    watchEffect(() => {
      const radioIsValid = general.motivoVisita !== null && general.motivoVisita !== 'OTRO'
      const inputIsValid = general.motivoVisita === 'OTRO' && (general.motivoVisitaEsp !== '' && general.motivoVisitaEsp !== null)
      const fields = [general.motivoVisita !== null, radioIsValid || inputIsValid]
      const completedFields = fields.filter(field => field).length
      const progress = completedFields / fields.length
      principal.progressBar = progress
    })

    return {
      general,
      disabled
    }
  }
})
</script>
