<template>
  <q-card>
    <q-card-section class="q-pa-xs" style="font-size: 12px">
      <div class="row bg-blue text-white items-center q-pa-sm">
        <div class="col-md-8 col-sm-8 col-xs-8">
          Concepto:
        </div>
        <div class="col-md-4 col-sm-4 col-xs-4">
          Nivel de cumplimiento
        </div>
      </div>
      <div class="row q-pl-sm q-pr-sm">
        <div class="col-md-8 col-sm-8 col-xs-8">
          Favorable
        </div>
        <div class="col-md-4 col-sm-4 col-xs-4">
          {{ levels.favorable[0] }}%-{{ levels.favorable[1] }}%
        </div>
      </div>
      <div class="row q-pl-sm q-pr-sm">
        <div class="col-md-8 col-sm-8 col-xs-8">
          Favorable con requerimientos
        </div>
        <div class="col-md-4 col-sm-4 col-xs-4">
          {{ levels.favorableRequerimientos[0] }}%-{{ levels.favorableRequerimientos[1] }}
        </div>
      </div>
      <div class="row q-pl-sm q-pr-sm">
        <div class="col-md-8 col-sm-8 col-xs-8">
          Desfavorable
        </div>
        <div class="col-md-4 col-sm-4 col-xs-4">
          {{ levels.desfavorable[0] }} {{ levels.desfavorable[1] }}%
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div>
        Concepto: <b>{{ opts[concept] }} {{ critical ? ', hallazgo critico (CR)' : '' }}</b>
      </div>
      <div>
        % de cumplimiento: {{ score }}%
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div style="font-size: 10px">
        {{ levels.mensaje }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { FormName } from 'src/modules/handlerApp/Director'
import { usePrincipal } from 'src/stores/principal'

const levels = {
  favorable: [95, 100],
  favorableRequerimientos: [50, 94],
  desfavorable: ['<', 49.9],
  mensaje: `En caso que uno o más de los aspectos a evaluar sea
    identificado como “crítico”, independiente del porcentaje de
    cumplimiento obtenido, el CONCEPTO SANITARIO a emitir
    será DESFAVORABLE, representación de riesgo inminente a la
    salud pública con aplicación de medida sanitaria (DS-AMS) y se
    procederá a aplicar la MEDIDA SANITARIA DE SEGURIDAD
    CORRESPONDIENTE.`
}

export default defineComponent({
  name: 'SanitaryConceptComponent',
  props: {
    levels: {
      type: Object,
      required: false,
      default: levels
    },
    score: { // Puntaje de 0 a 100
      type: String || null,
      required: false,
      default: 0
    },
    critical: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const principal = usePrincipal()
    principal.currentForm = FormName.EMPTY
    const opts = [
      '',
      'Favorable',
      'Favorable con requerimientos',
      'Desfavorable'
    ]
    const concept = ref(0)
    watchEffect(() => {
      if (!props.score) concept.value = 0
      const favorable = props.levels.favorable
      const favorableRequerimientos = props.levels.favorableRequerimientos
      const desfavorable = props.levels.desfavorable
      if ((props.score >= favorable[0] && props.score <= favorable[1]) && !props.critical) {
        concept.value = 1
      }
      if ((props.score >= favorableRequerimientos[0] && props.score <= favorableRequerimientos[1]) && !props.critical) {
        concept.value = 2
      }
      if ((props.score < desfavorable[1]) || props.critical) {
        concept.value = 3
      }
    })
    return {
      concept,
      opts
    }
  }
})
</script>
