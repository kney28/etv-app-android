<template>
  <q-option-group :options="options" type="radio" v-model="medidaSanitaria" @update:model-value="changeState" inline />
  <q-separator />
  <q-input label="N° Acta de la medida sanitaria" v-model="typeSanitaryMeasure.actNumber" white color="blue"
    :readonly="disableOpts" :disable="disableOpts"
    :rules="[val => val.length <= 100 || 'El campo es de maximo 100 caracteres']" />
  <q-list>
    <q-item v-for="(item, index) in typeSanitaryMeasure.options" :key="index" tag="label" v-ripple>
      <q-item-section avatar top>
        <q-radio :disable="disableOpts" color="teal" v-model="typeSanitaryMeasure.typeValue" :val="item.val" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { usePrincipal, useGeneralities } from 'src/stores/principal'
import { useFAMA29 } from 'src/stores/F-AM-A-29'

export default defineComponent({
  name: 'SanitaryMeasureForm',
  emits: ['action'],
  setup() {
    const principal = usePrincipal()
    const { medidaSanitaria } = storeToRefs(useGeneralities())
    const { typeSanitaryMeasure } = storeToRefs(useFAMA29())
    principal.currentForm = 11
    const disableNo = ref(false)
    const disableOpts = ref(false)

    const initial = () => {
      if (principal.hasCriticalPoints) {
        disableNo.value = true
        medidaSanitaria.value = 'Sí'
      }
      console.log(principal.hasCriticalPoints)
    }

    const changeState = (val) => {
      if (val === 'No') {
        disableOpts.value = true
        typeSanitaryMeasure.value.typeValue = null
      } else {
        disableOpts.value = false
      }
    }

    watchEffect(() => {
      const radioIsValid = medidaSanitaria.value !== null && medidaSanitaria.value !== 'Sí'
      const inputIsValid = medidaSanitaria.value === 'Sí' && (typeSanitaryMeasure.value.typeValue !== '' && typeSanitaryMeasure.value.typeValue !== null)
      const fields = [medidaSanitaria.value !== null, radioIsValid || inputIsValid]
      const completedFields = fields.filter(field => field).length
      const progress = completedFields / fields.length
      principal.progressBar = progress
    })

    onMounted(() => {
      initial()
    })

    return {
      medidaSanitaria,
      typeSanitaryMeasure,
      disableNo,
      disableOpts,
      changeState,
      options: [
        { label: 'Sí', value: 'Sí', color: 'purple' },
        { label: 'No', value: 'No', color: 'purple' }
      ]
    }
  }
})
</script>
