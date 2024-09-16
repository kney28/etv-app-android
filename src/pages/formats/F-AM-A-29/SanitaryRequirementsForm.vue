<template>
  <k-sanitary-requirements>
    <template v-slot:content>
      <div class="row">
        <div class="col-12">
          Se debe ajustar el establecimiento a la normatividad sanitaria vigente
          corrigiendo los hallazgos registrados en la presente acta.
        </div>
        <div class="col-12">
          <q-input v-model="requerimientosSanitarios" type="textarea" lazy-rules
            :rules="[val => val.length <= 200 || 'El campo es de maximo 200 caracteres']" />
        </div>
      </div>
    </template>
  </k-sanitary-requirements>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import SanitaryRequirementsComponent from 'src/components/SanitaryRequirements.vue'
import { useGeneralities, usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'SanitaryRequirementsForm',
  components: {
    kSanitaryRequirements: SanitaryRequirementsComponent
  },
  setup() {
    const principal = usePrincipal()
    const { requerimientosSanitarios } = storeToRefs(useGeneralities())
    principal.currentForm = 9
    return {
      requerimientosSanitarios
    }
  }
})
</script>
