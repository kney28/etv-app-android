<template>
  <div class="row">
    <div class="col-md-4 col-sm-6 col-xs-12">
      <k-input-date @update:model="principal.fechaRealizacion" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-select use-input v-model="principal.municipio" label="Municipio *" @filter="filterMunicipios"
        :options="optMunicipios" option-label="nom_municipio" option-value="cod_municipio" emit-value map-options
        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
        @update:model-value="limpiarSelect('establecimiento')" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-select use-input v-model="principal.establecimiento" label="Establecimiento *" @filter="filterEntidades"
        :options="optEntidades" option-label="nom_establecimiento" option-value="doc_establecimiento" emit-value
        map-options lazy-rules :rules="[val => !!val || 'El campo es obligatorio']"
        @update:model-value="limpiarSelect('direccion')" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-select use-input v-model="principal.direccion" label="Dirección *" @filter="filterDirecciones"
        :options="optDirecciones" option-label="direccion" option-value="doc_establecimiento" emit-value map-options
        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" prefix="Email:" type="email" v-model="principal.email" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? !!val : 'El correo no es valido']">
        <template v-slot:prepend>
          <q-icon name="email" color="blue" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DateInputComponent from 'src/components/DateInput.vue'
import { usePrincipal } from 'src/stores/principal'

export default defineComponent({
  name: 'EntityIdentComponent',
  components: {
    kInputDate: DateInputComponent
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const principal = usePrincipal()
    const optDirecciones = []
    const optEntidades = []
    const optMunicipios = []
    const filterMunicipios = () => {
      console.log('filterMunicipios')
    }

    const filterEntidades = () => {
      console.log('filterEntidades')
    }

    const filterDirecciones = () => {
      console.log('filterDirecciones')
    }

    const emitAction = (type, data) => {
      emit('filter', { type, data })
    }

    const limpiarSelect = (nomSelect) => {
      if (nomSelect == 'establecimiento') {
        principal.establecimiento = null
      }
      if (nomSelect == 'direccion') {
        principal.direccion = null
      }
    }
    return {
      principal,
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
