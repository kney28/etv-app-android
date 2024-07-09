<template>
  <q-card>
    <q-card-section>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-radio white color="purple" v-model="general.medidaSanitaria" label="Si" val="Sí" />
        <q-radio :disable="disableNo" white color="purple" v-model="general.medidaSanitaria" label="No" val="No" />
      </div>
      <q-separator />
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-input ref="input" label="¿Cual?" type="textarea" white color="blue" :readonly="disabled" :disable="disabled"
          v-model="general.obsMedidaSanitaria" lazy-rules
          :rules="[val => val.length <= 200 || 'El campo es de maximo 200 caracteres', val => !!val || 'El campo es obligatorio']" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, watchEffect, onMounted } from 'vue'
import { useGeneralities, usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'SanitaryMeasureComponent',
  setup() {
    const general = useGeneralities()
    const disabled = ref(true)
    const input = ref(null)
    const disableNo = ref(false)
    const principal = usePrincipal()
    const initial = () => {
      if (principal.hasCriticalPoints) {
        disableNo.value = true
        general.medidaSanitaria = 'Sí'
      }
      console.log(principal.hasCriticalPoints)
    }

    watchEffect(() => {
      if (general.medidaSanitaria === 'Sí') {
        disabled.value = false
        if (input.value) input.value.focus()
      } else {
        general.obsMedidaSanitaria = ''
        disabled.value = true
        if (input.value) input.value.resetValidation()
      }
    })

    watchEffect(() => {
      const radioIsValid = general.medidaSanitaria !== null && general.medidaSanitaria !== 'Sí'
      const inputIsValid = general.medidaSanitaria === 'Sí' && (general.obsMedidaSanitaria !== '' && general.obsMedidaSanitaria !== null)
      const fields = [general.medidaSanitaria !== null, radioIsValid || inputIsValid]
      const completedFields = fields.filter(field => field).length
      const progress = completedFields / fields.length
      principal.progressBar = progress
    })

    onMounted(() => {
      initial()
    })

    return {
      input,
      disableNo,
      general,
      disabled
    }
  }
})
</script>
