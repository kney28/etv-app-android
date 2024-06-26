<template>
  <q-form ref="form1" @submit.prevent="">
    <div class="row">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <k-input-date @update:model="entity.fechaRealizacion" />
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-select use-input v-model="entity.municipio" label="Municipio *" @filter="filterMunicipios"
          :options="optMunicipios" option-label="nom_municipio" option-value="cod_municipio" emit-value map-options
          lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
          @update:model-value="limpiarSelect('establecimiento')" />
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-select use-input v-model="entity.establecimiento" label="Establecimiento *" @filter="filterEntidades"
          :options="optEntidades" option-label="nom_establecimiento" option-value="doc_establecimiento" emit-value
          map-options lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
          @update:model-value="limpiarSelect('direccion')" />
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-select use-input v-model="entity.direccion" label="Dirección *" @filter="filterDirecciones"
          :options="optDirecciones" option-label="direccion" option-value="doc_establecimiento" emit-value map-options
          lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-input white color="blue" prefix="Email:" type="email" v-model="entity.email" lazy-rules
          :rules="[val => !!val || 'El campo es obligatorio', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? !!val : 'El correo no es valido']">
          <template v-slot:prepend>
            <q-icon name="email" color="blue" />
          </template>
        </q-input>
      </div>
    </div>
  </q-form>
  <!-- <q-btn label="enviar" @click="onClick" /> -->
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useMediator } from 'src/stores/mediator'
import { FormName } from 'src/modules/handlerApp/Director'
import { storeToRefs } from 'pinia'
import DateInputComponent from 'src/components/DateInput.vue'
import { useEntityIdentification, usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'EntityIdentComponent',
  components: {
    kInputDate: DateInputComponent
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const entity = useEntityIdentification()
    const { mediator } = useMediator()
    const { currentForm } = storeToRefs(usePrincipal())
    currentForm.value = FormName.ENTITY
    const form1 = ref('form1')
    mediator.director.setForms(form1, FormName.ENTITY)
    const optDirecciones = []
    const optEntidades = []
    const optMunicipios = []
    const filterMunicipios = (val, update) => {
      emitAction('Municipality', { val, update })
    }

    const filterEntidades = () => {
      console.log('filterEntidades')
      emitAction('Entity', null)
    }

    const filterDirecciones = () => {
      console.log('filterDirecciones')
      emitAction('Adress', null)
    }

    const emitAction = (type, data) => {
      emit('filter', { type, data })
    }

    const limpiarSelect = (nomSelect) => {
      if (nomSelect == 'establecimiento') {
        entity.establecimiento = null
      }
      if (nomSelect == 'direccion') {
        entity.direccion = null
      }
    }
    return {
      form1,
      entity,
      optMunicipios,
      optEntidades,
      optDirecciones,
      filterMunicipios,
      filterEntidades,
      filterDirecciones,
      emitAction,
      limpiarSelect
    }
  }
})
</script>
