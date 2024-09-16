<template>
  <div class="row justify-center">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-input white color="blue" v-model="diasHabilesPlazo" label="Días hábiles plazo" />
    </div>
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-field label="Fecha de inicio y fin" v-model="fechasPlazo">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="fechasPlazo" range>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ `Desde: ${fechasPlazo?.from}, Hasta:
            ${fechasPlazo?.to}` }}</div>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useFAMA29 } from 'src/stores/F-AM-A-29'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'ComplianceDeadlineForm',
  setup() {
    const { diasHabilesPlazo, fechasPlazo } = storeToRefs(useFAMA29())
    const principal = usePrincipal()
    principal.currentForm = 12

    return {
      diasHabilesPlazo,
      fechasPlazo
    }
  }
})
</script>
