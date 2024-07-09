<template>
  <k-sanitary-requirements>
    <template v-slot:content>
      <q-form ref="form1" @submit.prevent="">
        <div class="row">
          <div class="col-12">
            Se debe ajustar el establecimiento a la normatividad sanitaria vigente corrigiendo los hallazgos registrados
            en la presente acta.
            <br>
            Si el establecimiento obtuvo concepto sanitario FAVORABLE CON REQUERIMIENTOS, se concede
            <b>({{ requerimientosSanitarios }})</b> días (máximo 30 días, contados a partir de la fecha de
            notificación), para corregir los hallazgos registrados en la presente acta.
          </div>
          <div class="col-12">
            <q-input v-model="requerimientosSanitarios" type="number" label="Días requieridos" lazy-rules
              :rules="[val => !!val || 'El campo es obligatorio']" />
          </div>
        </div>
      </q-form>
    </template>
  </k-sanitary-requirements>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useGeneralities, usePrincipal } from 'src/stores/principal'
import { storeToRefs } from 'pinia'
import SanitaryRequirementsComponent from 'src/components/SanitaryRequirements.vue'

export default defineComponent({
  name: 'SanitaryRequirementsForm',
  components: {
    kSanitaryRequirements: SanitaryRequirementsComponent
  },
  emits: ['action'],
  setup() {
    const { requerimientosSanitarios } = storeToRefs(useGeneralities())
    const { currentForm } = storeToRefs(usePrincipal())
    const form1 = ref('form1')
    currentForm.value = 9
    return {
      requerimientosSanitarios,
      form1
    }
  }
})
</script>
