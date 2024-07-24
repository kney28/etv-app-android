<template>
  <k-sanitary-requirements>
    <template v-slot:content>
      <div class="row">
        <div class="col-12">
          Se debe ajustar el establecimiento a la normatividad sanitaria vigente
          corrigiendo los hallazgos registrados en la presente acta.
        </div>
      </div>
    </template>
  </k-sanitary-requirements>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SanitaryRequirementsComponent from 'src/components/SanitaryRequirements.vue'
import { FormName } from 'src/modules/handlerApp/Director'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'SanitaryRequirementsForm',
  components: {
    kSanitaryRequirements: SanitaryRequirementsComponent
  },
  setup() {
    const principal = usePrincipal()
    principal.currentForm = FormName.EMPTY
    return {}
  }
})
</script>
