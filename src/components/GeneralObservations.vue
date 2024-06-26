<template>
  <q-form ref="form1" @submit.prevent="">
    <q-card>
      <q-card-section>
        <b>Observaciones *</b>
      </q-card-section>

      <q-separator />

      <q-card-section class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div style="font-size: 11px">
            Por parte de la autoridad sanitaria:
          </div>
          <q-input type="textarea" white color="blue" v-model="general.obsAutoridadSanitaria" lazy-rules :rules="[
    val => !!val || 'El campo es obligatorio', val => val.length <= maxCharacters || `El campo es de maximo ${maxCharacters} caracteres`
  ]" />
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div style="font-size: 11px">
            Por parte del establecimiento:
          </div>
          <q-input type="textarea" white color="blue" v-model="general.obsEstablecimiento" lazy-rules :rules="[
    val => !!val || 'El campo es obligatorio', val => val.length <= maxCharacters || `El campo es de maximo ${maxCharacters} caracteres`
  ]" />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>
<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useGeneralities } from 'src/stores/principal'
import { usePrincipal } from 'src/stores/principal'
import { useMediator } from 'src/stores/mediator'
import { FormName } from 'src/modules/handlerApp/Director'

export default defineComponent({
  name: 'GeneralObservationsComponent',
  props: {
    maxCharacters: {
      type: Number,
      required: false,
      default: 500
    }
  },
  setup() {
    const general = useGeneralities()
    const principal = usePrincipal()
    const form1 = ref('form1')
    const { mediator } = useMediator()
    principal.currentForm = FormName.GENERAL_OBSERVATIONS
    mediator.director.setForms(form1, FormName.GENERAL_OBSERVATIONS)

    watchEffect(() => {
      const fields = [general.obsAutoridadSanitaria, general.obsEstablecimiento]
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
