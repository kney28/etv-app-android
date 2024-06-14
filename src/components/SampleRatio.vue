<template>
  <q-card>
    <q-card-section>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <div>
          Número total de muestras de agua tomadas *
        </div>
        <q-input white color="blue" v-model="general.muestrasTomadas" lazy-rules
          :rules="[val => !!val || 'El campo es obligatorio']" />
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <div>
          Número del acta de toma de muestras *
        </div>
        <q-input white color="blue" v-model="general.actaTomaMuestras" lazy-rules
          :rules="[val => !!val || 'El campo es obligatorio']" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useGeneralities } from 'src/stores/principal'

export default defineComponent({
  name: 'SampleRatioComponent',
  setup() {
    const general = useGeneralities()
    return {
      general
    }
  }
})
</script>
