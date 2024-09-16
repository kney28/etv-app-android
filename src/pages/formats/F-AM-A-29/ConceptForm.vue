<template>
  <k-sanitary-concept :score="score.toFixed(2)" :critical="hasCriticalPoints" :levels="conceptConfig" />
</template>

<script>
import { defineComponent } from 'vue'
import SanitaryConceptComponent from 'src/components/SanitaryConcept.vue'
import { useFAMA29 } from 'src/stores/F-AM-A-29'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'ConceptForm',
  components: {
    kSanitaryConcept: SanitaryConceptComponent
  },
  setup() {
    const { score } = useFAMA29()
    const { hasCriticalPoints } = usePrincipal()
    return {
      score,
      hasCriticalPoints,
      conceptConfig: {
        favorable: [95, 100],
        favorableRequerimientos: [50, 94.9],
        desfavorable: ['<', 49.9],
        mensaje: `En caso que uno o más de los aspectos a evaluar sea identificado como crítico
        y calificado como Inaceptable (I), independiente del porcentaje de
        cumplimiento obtenido, el CONCEPTO SANITARIO a emitir será DESFAVORABLE
        y se procederá a aplicar la MEDIDA SANITARIA DE SEGURIDAD respectiva.`
      }
    }
  }
})
</script>
