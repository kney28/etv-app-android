<template>
  <k-sanitary-concept :score="score.toFixed(2)" :critical="hasCriticalPoints" :levels="conceptConfig" />
</template>

<script>
import { defineComponent } from 'vue'
import SanitaryConceptComponent from 'src/components/SanitaryConcept.vue'
import { useFAMA02 } from 'src/stores/F-AM-A-02'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'ConceptForm',
  components: {
    kSanitaryConcept: SanitaryConceptComponent
  },
  setup() {
    const { score } = useFAMA02()
    const { hasCriticalPoints } = usePrincipal()
    return {
      score,
      hasCriticalPoints,
      conceptConfig: {
        favorable: [90, 100],
        favorableRequerimientos: [60, 89.9],
        desfavorable: ['<', 59.9],
        mensaje: `En caso que uno o más de los aspectos a evaluar sea
          identificado como “crítico”, independiente del porcentaje de
          cumplimiento obtenido, el CONCEPTO SANITARIO a emitir
          será DESFAVORABLE, representación de riesgo inminente a la
          salud pública con aplicación de medida sanitaria (DS-AMS) y se
          procederá a aplicar la MEDIDA SANITARIA DE SEGURIDAD
          CORRESPONDIENTE.`
      }
    }
  }
})
</script>
