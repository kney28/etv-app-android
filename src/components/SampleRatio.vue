<template>
  <q-form ref="form1" @submit.prevent="">
    <q-card>
      <q-card-section>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div>
            Número total de muestras tomadas *
          </div>
          <q-input type="number" white color="blue" v-model="general.muestrasTomadas" lazy-rules
            :rules="[val => !!val || 'El campo es obligatorio', val => parseInt(val) > 0 || 'El número debe ser mayor a 0', val => Number.isInteger(Number(val)) || 'No pude tener decimales']" />
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div>
            Número del acta de toma de muestras *
          </div>
          <q-input ref="input2" white color="blue" v-model="general.actaTomaMuestras" lazy-rules
            :rules="[val => !!val || 'El campo es obligatorio']" />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { usePrincipal } from 'src/stores/principal'
import { useGeneralities } from 'src/stores/principal'
import { useMediator } from 'src/stores/mediator'
import { FormName } from 'src/modules/handlerApp/Director'

export default defineComponent({
  name: 'SampleRatioComponent',
  setup() {
    const general = useGeneralities()
    const principal = usePrincipal()
    const { mediator } = useMediator()
    const form1 = ref('form1')
    principal.currentForm = FormName.SAMPLE_RATIO
    mediator.director.setForms(form1, FormName.SAMPLE_RATIO)

    watchEffect(() => {
      const fields = [general.muestrasTomadas, general.actaTomaMuestras]
      const completedFields = fields.filter(field => field).length
      const progress = completedFields / fields.length
      principal.progressBar = progress
    })
    return {
      form1,
      general
    }
  }
})
</script>
