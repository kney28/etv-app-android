<template>
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
        <q-input type="textarea" white color="blue" v-model="general.obsAutoridadSanitaria" lazy-rules
          :rules="[val => val.length <= maxCharacters || `El campo es de maximo ${maxCharacters} caracteres`]" />
      </div>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div style="font-size: 11px">
          Por parte del establecimiento:
        </div>
        <q-input type="textarea" white color="blue" v-model="general.obsEstablecimiento" lazy-rules
          :rules="[val => val.length <= maxCharacters || `El campo es de maximo ${maxCharacters} caracteres`]" />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue'
import { useGeneralities } from 'src/stores/principal'

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
    return {
      general
    }
  }
})
</script>
