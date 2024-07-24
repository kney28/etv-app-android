<template>
  <k-sanitary-concept :score="score.toFixed(2)" :critical="hasCriticalPoints" :levels="conceptConfig" />
</template>

<script>
import { defineComponent } from 'vue'
import SanitaryConceptComponent from 'src/components/SanitaryConcept.vue'
import { useFAMA09 } from 'src/stores/F-AM-A-09'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'ConceptForm',
  components: {
    kSanitaryConcept: SanitaryConceptComponent
  },
  setup() {
    const { score } = useFAMA09()
    const { hasCriticalPoints } = usePrincipal()
    return {
      score,
      hasCriticalPoints,
      conceptConfig: {
        favorable: [90, 100],
        favorableRequerimientos: [60, 89.9],
        desfavorable: ['<', 59.9],
        mensaje: `En caso que uno o más de los aspectos a evaluar sea identificado como crítico
        y calificado como Inaceptable (I), independiente del porcentaje de
        cumplimiento obtenido, el CONCEPTO SANITARIO a emitir será DESFAVORABLE
        y se procederá a aplicar la MEDIDA SANITARIA DE SEGURIDAD respectiva.`
      }
    }
  }
})
</script>
