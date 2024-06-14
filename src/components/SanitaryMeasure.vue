<template>
  <q-card>
    <q-card-section>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-radio white color="purple" v-model="general.medidaSanitaria" label="Si" val="Sí" />
        <q-radio white color="purple" v-model="general.medidaSanitaria" label="No" val="No" />
      </div>
      <q-separator />
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-input label="¿Cual?" type="textarea" white color="blue" :readonly="disabled"
          v-model="general.obsMedidaSanitaria" lazy-rules
          :rules="[val => val.length <= 200 || 'El campo es de maximo 200 caracteres']" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useGeneralities } from 'src/stores/principal'

export default defineComponent({
  name: 'SanitaryMeasureComponent',
  setup() {
    const general = useGeneralities()
    const disabled = ref(true)

    watchEffect(() => {
      if (general.medidaSanitaria === 'Sí') {
        disabled.value = false
      } else {
        general.obsMedidaSanitaria = null
        disabled.value = true
      }
    })
    return {
      general,
      disabled
    }
  }
})
</script>
