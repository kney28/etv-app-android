<template>
  <k-reason-visit />
  <div v-if="motivoVisita == 'INTERESADO' || motivoVisita == 'QUEJAS-RECLAMOS'" class="row q-mt-md q-col-gutter-xs">
    <div class="col-md-4 col-sm-6 col-xs-12">
      Número y fecha de radicado en caso de que el motivo de la visita sea solicitud
      de interesado o asociado a PQR
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="codeFiled" label="Especifique"
        :rules="[val => val.length <= 100 || 'El campo es de maximo 100 caracteres']" />
    </div>
  </div>

</template>

<script>
import { defineComponent /* , watchEffect */ } from 'vue'
import ReasonVisitComponent from 'src/components/ReasonVisit.vue'
import { storeToRefs } from 'pinia'
import { usePrincipal, useGeneralities } from 'src/stores/principal'
import { useFAMA29 } from 'src/stores/F-AM-A-29'

export default defineComponent({
  name: 'ReasonVisitForm',
  components: {
    kReasonVisit: ReasonVisitComponent
  },
  emits: ['action'],
  setup() {
    const principal = usePrincipal()
    const { motivoVisita /* , motivoVisitaEsp */ } = storeToRefs(useGeneralities())
    const { codeFiled } = storeToRefs(useFAMA29())
    principal.currentForm = 10

    /* watchEffect(() => {
      if (motivoVisita.value !== 'INTERESADO' && motivoVisita.value !== 'QUEJAS-RECLAMOS') {
        codeFiled.value = ''
      }
    })

    watchEffect(() => {
      const radioIsValid = motivoVisita.value !== null && (motivoVisita.value !== 'INTERESADO' && motivoVisita.value !== 'QUEJAS-RECLAMOS' && motivoVisita.value !== 'OTRO')
      const inputIsValid = (motivoVisita.value === 'INTERESADO' || motivoVisita.value === 'QUEJAS-RECLAMOS' || motivoVisita.value === 'OTRO') && (codeFiled.value !== '' && codeFiled.value !== null) || (motivoVisitaEsp.value !== '' && motivoVisitaEsp.value !== null)
      const fields = [motivoVisita.value !== null, radioIsValid || inputIsValid]
      const completedFields = fields.filter(field => field).length
      const progress = completedFields / fields.length
      principal.progressBar = progress
    }) */

    return {
      motivoVisita,
      codeFiled
    }
  }
})
</script>
