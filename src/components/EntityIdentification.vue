<template>
  <div class="row">
    <div class="col-md-4 col-sm-6 col-xs-12">
      <k-input-date @update:model="principal.fechaRealizacion" />
    </div>
    <!--<div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="AreaOperativa" label="Área operativa *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="CodigoArea" label="Código *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="NumeroActa" label="Acta *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="Departamento" label="Departamento *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>-->
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
    <!--<div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="CorregimientoSector"
        label="Corregimiento / Vereda / Localidad / Sector *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="NombreAutoridadSanitaria"
        label="Nombre de la autoridad sanitaria *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="NumeroConsecutivoActaVisita"
        label="Numero consecutivo acta de visita *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="FechaVisitaAnteriorDia" label="Fecha visita anterior dia *"
        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="FechaVisitaAnteriorMes" label="Fecha visita anterior mes *"
        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="FechaVisitaAnteriorAnyo" label="Fecha visita anterior año *"
        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>-->
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div>¿Se anexa copia de visita anterior? *</div>
      <q-radio color="teal" label="Si" v-model="principal.AnexaCopiaVisitaAnterior" val="Sí" />
      <q-radio color="teal" label="No" v-model="principal.AnexaCopiaVisitaAnterior" val="No" />
      <q-separator />
    </div>
    <!--<div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="ConceptoAnterior" label="ConceptoAnterior *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input white color="blue" v-model="NombreFuncionarioVisitaAnterior"
        label="NombreFuncionarioVisitaAnterior *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>-->
    <q-separator></q-separator>

    <div class="col-md-4 col-sm-6 col-xs-12 q-mt-md">
      <div>
        ¿Se establecieron plazos para la ejecución de requerimientos? *
      </div>
      <q-radio color="teal" label="Si" v-model="principal.PlazosEstablecidosEjecucionRequerimientos" val="Sí" />
      <q-radio color="teal" label="No" v-model="principal.PlazosEstablecidosEjecucionRequerimientos" val="No" />
      <q-separator />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12 q-mt-md">
      <div>
        ¿Se dispuso de un plan de mejoramiento? *
      </div>
      <q-radio color="teal" label="Si" v-model="principal.DispusoPlanMejoramiento" val="Sí" />
      <q-radio color="teal" label="No" v-model="principal.DispusoPlanMejoramiento" val="No" />
      <q-separator />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12 q-mt-md">
      <q-input type="number" white color="blue" v-model="principal.NumeroTotalHabitantesAtendidosESPMunicipio"
        label="Número total de habitantes atendidos por ESP del municipio *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input type="number" white color="blue" v-model="principal.NumeroTotalViviendasCascoUrbano"
        label="Número total de viviendas casco urbano *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12">
      <q-input type="number" white color="blue" v-model="principal.NumeroTotalViviendasRestoNoAtendidas"
        label="Número total de viviendas resto (NO ATENDIDAS) *" lazy-rules
        :rules="[val => !!val || 'El campo es obligatorio']" />
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
