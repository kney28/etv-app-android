<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <q-card class="q-mb-lg">
        <q-card-section :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-4 text-black'">
          <div class="text-center">
            <b>Formulario F-EV-04</b>
          </div>
        </q-card-section>
        <q-card-section class="text-center">
          Acta de visita de vigilancia y control
          de artropodos vectores y de interes
          en salud publica en sitios de concentracion humana
        </q-card-section>
      </q-card>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Etv_f-ev-04" :rows="dataEtv" :filter="filter" :columns="shows" row-key="name">
            <template v-slot:top-left>
              <q-btn unelevated rounded icon="add" color="primary" @click="creating" label="Agregar" />
              <q-space />
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props" style="font-size: 10px">
                  {{ props.rowIndex + 1 }}
                </q-td>
                <q-td key="formato" :props="props" class="text-left">
                  <q-btn size="sm" flat padding="none" text-color="blue-10" :label="props.row.id_form" @click="showFormat(props.row)" />
                </q-td>
                <!--<q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="editing(props.row)" />
                </q-td>-->
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="red-7" icon="delete_forever" v-on:click="onDelete(props.row)" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </transition>
      <q-inner-loading :showing="visible">
        <q-spinner-puff color="info" size="100px" />
      </q-inner-loading>
    </div>
    <q-dialog v-model="dialog" persistent position="top">
      <q-card style="max-width: 90vw; max-height: 80vh" class="q-mt-md">
        <q-linear-progress :value="10" color="blue" />
        <q-card-section class="row items-center">
          <div class="text-h6"> </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-banner>
          <template v-slot:avatar>
            <q-icon name="warning" color="warning" />
          </template>
          Los campos marcados con (*) son obligatorios
        </q-banner>
        <q-card-section class="q-pa-none q-pt-sm">
          <q-form ref="myForm" @submit.prevent="">
            <div style="max-width: 100vw;">
              <q-tabs v-model="tab" dense inline-label outside-arrows mobile-arrows active-color="white"
                indicator-color="orange" class="shadow-2 fixed-bottom z-max bg-info">
                <q-tab name="section1" label="Sección 1" />
                <q-tab name="section2" label="Sección 2" />
                <q-tab name="section3" label="Sección 3" />
                <q-tab name="section4" label="Sección 4" />
              </q-tabs>

              <q-separator />

              <q-tab-panels keep-alive v-model="tab" animated>
                <q-tab-panel name="section1">
                  <!--<div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" v-model="acta" label="Acta *" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>-->
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input label="Fecha *" filled v-model="fecha" mask="date" :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="fecha">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-select
                      use-input
                      v-model="municipio"
                      label="Municipio *"
                      @filter="filterMunicipios"
                      :options="optMunicipios"
                      option-label="nom_municipio"
                      option-value="cod_municipio"
                      emit-value
                      map-options
                      lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']"
                      @update:model-value="limpiarSelect('establecimiento')"
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-select
                      use-input
                      v-model="establecimiento"
                      label="Establecimiento *"
                      @filter="filterEntidades"
                      :options="optEntidades"
                      option-label="nom_establecimiento"
                      option-value="doc_establecimiento"
                      emit-value
                      map-options
                      lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']"
                      @update:model-value="limpiarSelect('direccion')"
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-select
                      use-input
                      v-model="direccion"
                      label="Dirección *"
                      @filter="filterDirecciones"
                      :options="optDirecciones"
                      option-label="direccion"
                      option-value="doc_establecimiento"
                      emit-value
                      map-options
                      lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']"
                    />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-select v-model="caracter_institucional" label="Caracter institucional *"
                      :options="[{ label: 'Pública', value: 'publica' }, { label: 'Privada', value: 'privada' }]"
                      emit-value map-options lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" type="number" v-model="categoria" label="Categoría *" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio', val => val <= 14 || 'La categoría debe ser menor o igual a 14']" />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" type="number" v-model="personas_protegidas"
                      label="# de personas protegidas *" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>
                  <!--<div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" v-model="representante_legal" label="Representante legal *" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" type="number" v-model="cedula" label="Cédula *" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>-->
                </q-tab-panel>
                <q-tab-panel name="section2">
                  <q-banner class="text-blue">
                    <template v-slot:avatar>
                      <q-icon name="info" color="blue" />
                    </template>
                    Criaderos o focos encontrados de:
                  </q-banner>
                  <div>
                    <div class="row justify-between">
                      <q-btn class="q-mt-sm" color="secondary" @click="addFieldSet(1)" icon="add" label="Agegar"
                        :disable="criaderos.length == 10" />
                    </div>
                    <div v-for="(criadero, index) in criaderos" :key="index">
                      <div :class="$q.dark.mode ? 'q-mt-sm q-pa-sm' : 'bg-grey-2 q-mt-sm q-pa-sm'">
                        <div class="row">
                          <div class="text-blue">{{ index + 1 }}</div>
                          <div class="col text-right">
                            <q-btn round @click="removeFieldSet(index, 1)" icon="delete" />
                          </div>
                        </div>
                        <div class="field-set">
                          <div class="col-md-4 col-sm-6 col-xs-12">
                            <q-input white color="blue" type="number" v-model="criadero.cantidad" label="Cantidad *"
                              lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                          </div>
                          <div class="col-md-4 col-sm-6 col-xs-12">
                            <q-select v-model="criadero.tipo" label="Tipo criadero o foco *" :options="tipo_criaderoOpt"
                              option-value="id" option-label="description" emit-value map-options lazy-rules
                              :rules="[val => !!val || 'El campo es obligatorio']" />
                          </div>
                          <div class="col-md-4 col-sm-6 col-xs-12">
                            <q-input white color="blue" v-model="criadero.ubicacion" label="Lugar donde se ubica(n) *"
                              lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--<div class="row justify-between">
                    <q-btn class="q-mt-sm" color="secondary" @click="addCampo" icon="add" label="Agegar" />
                  </div>
                  <div class="bg-grey-2 q-mt-sm q-pa-sm" :hidden="campos.hidden1">
                    <div class="column items-end">
                      <q-btn round color="red" @click="removeCampo(1)" icon="delete_forever" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input ref="criadero1" white color="blue" type="number" v-model="criaderos.criadero1.cantidad"
                        label="Cantidad *" lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero1.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero1.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div class="bg-grey-2 q-mt-sm q-pa-sm" :hidden="campos.hidden2">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero2.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero2.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero2.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden3">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero3.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero3.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero3.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden4">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero4.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero4.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero4.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden5">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero5.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero5.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero5.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden6">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero6.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero6.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero6.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden7">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero7.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero7.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero7.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden8">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero8.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero8.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero8.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden9">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero9.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero9.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero9.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :hidden="campos.hidden10">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="criaderos.criadero10.cantidad" label="Cantidad *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-select v-model="criaderos.criadero10.tipo" label="Tipo criadero o foco *"
                        :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value map-options
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="criaderos.criadero10.ubicacion"
                        label="Lugar donde se ubica(n) *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div> -->
                </q-tab-panel>
                <q-tab-panel name="section3">
                  <q-banner class="text-blue">
                    <template v-slot:avatar>
                      <q-icon name="info" color="blue" />
                    </template>
                    Criaderos o focos potenciales encontrados de:
                  </q-banner>
                  <div>
                    <div class="row justify-between">
                      <q-btn class="q-mt-sm" color="secondary" @click="addFieldSet(2)" icon="add" label="Agegar"
                        :disable="criaderosPotencial.length == 10" />
                    </div>
                    <div v-for="(criaderoPotencial, index) in criaderosPotencial" :key="index">
                      <div :class="$q.dark.mode ? 'q-mt-sm q-pa-sm' : 'bg-grey-2 q-mt-sm q-pa-sm'">
                        <div class="row">
                          <div class="text-blue">{{ index + 1 }}</div>
                          <div class="col text-right">
                            <q-btn round @click="removeFieldSet(index, 2)" icon="delete" />
                          </div>
                        </div>
                        <div class="field-set">
                          <div class="col-md-4 col-sm-6 col-xs-12">
                            <q-input white color="blue" type="number" v-model="criaderoPotencial.cantidad"
                              label="Cantidad *" lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                          </div>
                          <div class="col-md-4 col-sm-6 col-xs-12">
                            <q-select v-model="criaderoPotencial.tipo" label="Tipo criadero o foco *"
                              :options="tipo_criaderoOpt" option-value="id" option-label="description" emit-value
                              map-options lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                          </div>
                          <div class="col-md-4 col-sm-6 col-xs-12">
                            <q-input white color="blue" v-model="criaderoPotencial.ubicacion"
                              label="Lugar donde se ubica(n) *" lazy-rules
                              :rules="[val => !!val || 'El campo es obligatorio']" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--<div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" v-model="criadero_potencial_cantidad" label="Cantidad *" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" v-model="tipo_criadero_potencial" label="Tipo *" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" v-model="criadero_potencial_ubicacion" label="Lugar donde se ubica(n) *"
                      lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                  </div>-->
                  <q-banner class="text-blue">
                    <template v-slot:avatar>
                      <q-icon name="info" color="blue" />
                    </template>
                    Observaciones y/o recomendaciones para prevenir o eliminar los focos existentes o potenciales
                  </q-banner>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" type="textarea" v-model="observaciones" label="Observaciones *" lazy-rules
                      :rules="[val => val.length <= 200 || 'El campo es de maximo 200 caracteres']" />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="section4">
                  <q-banner class="text-blue">
                    <template v-slot:avatar>
                      <q-icon name="info" color="blue" />
                    </template>
                    Toldillos para pacientes febriles en centros hospitalarios, batallones militares y afines
                  </q-banner>
                  <div :class="$q.dark.mode ? 'q-mt-sm q-pa-sm' : 'bg-grey-2 q-mt-sm q-pa-sm'">
                    <div class="q-mb-md text-h6 text-weight-regular text-grey-9 col-md-12 col-sm-12 col-xs-12">
                      Toldillo adulto
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_adulto_bueno"
                        label="Estado bueno (No.) *" lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_adulto_regular"
                        label="Estado regular (No.) *" lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_adulto_malo" label="Estado malo (No.) *"
                        lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="toldillo_adulto_total" label="Total" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" readonly />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_adulto_uso" label="En Uso *" lazy-rules
                        :rules="[val => val <= toldillo_adulto_total || 'El valor no puede ser mayor al total', val => !!val || 'El campo es obligatorio']" />
                    </div>
                  </div>
                  <div :class="$q.dark.mode ? 'q-mt-sm q-pa-sm' : 'bg-grey-2 q-mt-sm q-pa-sm'">
                    <div class="q-mb-md text-h6 text-weight-regular text-grey-9 col-md-12 col-sm-12 col-xs-12">
                      Toldillo pediátrico
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_pedriatico_bueno"
                        label="Estado bueno (No.) *" lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_pedriatico_regular"
                        label="Estado regular (No.) *" lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_pedriatico_malo"
                        label="Estado malo (No.) *" lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" v-model="toldillo_pedriatico_total" label="Total *" lazy-rules
                        :rules="[val => !!val || 'El campo es obligatorio']" readonly />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="number" v-model="toldillo_pedriatico_uso" label="En Uso *"
                        lazy-rules
                        :rules="[val => val <= toldillo_pedriatico_total || 'El valor no puede ser mayor al total', val => !!val || 'El campo es obligatorio']" />
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                      <q-input white color="blue" type="textarea" v-model="toldillo_observaciones" label="Observaciones"
                        lazy-rules :rules="[val => val.length <= 200 || 'El campo es de maximo 200 caracteres']" />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12">
                    <q-input white color="blue" prefix="Email:" type="email" v-model="email" lazy-rules
                      :rules="[val => !!val || 'El campo es obligatorio', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? !!val : 'El correo no es valido']">
                      <template v-slot:prepend>
                        <q-icon name="email" color="blue" />
                      </template>
                    </q-input>
                  </div>
                  <div class="row justify-between">
                    <q-card-actions align="left" class="text-teal">
                    </q-card-actions>
                    <q-card-actions align="right" class="text-teal">
                      <div v-if="!isEditing">
                        <q-btn text-color="black" round icon="check" @click.prevent="onSubmit" color="teal-13" />
                        <q-tooltip>Guardar datos</q-tooltip>
                      </div>
                      <div v-else>
                        <q-btn text-color="black" round icon="check" @click.prevent="onEditing" color="teal-13" />
                        <q-tooltip>Editar datos</q-tooltip>
                      </div> &nbsp;
                      <div>
                        <q-btn round icon="fa-solid fa-xmark" v-close-popup color="red-7" />
                        <q-tooltip>Cancelar</q-tooltip>
                      </div>
                    </q-card-actions>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
              <!--<q-tabs v-model="tab" inline-label outside-arrows mobile-arrows active-color="blue-13"
                indicator-color="blue-13" class="text-grey-9 shadow-2">
                <q-tab name="section1" label="Sección 1" />
                <q-tab name="section2" label="Sección 2" />
                <q-tab name="section3" label="Sección 3" />
                <q-tab name="section4" label="Sección 4" />
              </q-tabs>-->
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogWarning" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Información</div>
          {{ 'Mensaje: ' + message }}
        </q-card-section>
        <q-card-actions align="right" class="text-teal">
          <div>
            <q-btn round icon="fa-solid fa-xmark" v-close-popup color="red-7" />
            <q-tooltip>Cerrar</q-tooltip>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted, computed, reactive, watch } from 'vue'
import { useQuasar, uid } from 'quasar'
import { TIPOCRIADERO, saveFile } from '../../constants/constants'
import { conexionBD } from 'src/stores/conexionBD'
import { storeToRefs } from 'pinia'
import { Geolocation } from '@capacitor/geolocation'

export default defineComponent({
  name: 'F-EV-04Page',
  setup() {
    const conn = conexionBD()
    const { DB, SQLITE } = storeToRefs(conn)
    const db = DB.value
    const sqlite = SQLITE.value
    const $q = useQuasar()
    const userName = ref($q.localStorage.getItem('username'))
    const campos = reactive({
      count: 1,
      hidden1: true,
      hidden2: true,
      hidden3: true,
      hidden4: true,
      hidden5: true,
      hidden6: true,
      hidden7: true,
      hidden8: true,
      hidden9: true,
      hidden10: true
    })
    const lista = reactive({
      add: [0],
      remove: [0]
    })
    const criaderos = ref([])
    const criaderosPotencial = ref([])
    const formato = ref(null)
    const tab = ref('section1')
    const link = ref(null)
    const dialog = ref(false)
    const dialogWarning = ref(false)
    const message = ref(null)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataEtv = ref([])
    const coords = ref(null)
    const acta = ref(1)
    const fecha = ref(null)
    const dia = ref(null)
    const mes = ref(null)
    const anio = ref(null)
    const municipio = ref(null)
    const establecimiento = ref(null)
    const direccion = ref(null)
    const caracter_institucional = ref(null)
    const categoria = ref(3)
    const personas_protegidas = ref(2)
    const representante_legal = ref('Carlos Perez')
    const cedula = ref(1245787)
    const criadero_cantidad = ref(2)
    const tipo_criaderoOpt = ref(TIPOCRIADERO)
    const observaciones = ref('Ninguna')
    const toldillo_adulto_bueno = ref(2)
    const toldillo_adulto_regular = ref(2)
    const toldillo_adulto_malo = ref(2)
    const toldillo_adulto_total = computed(() =>
      parseInt(toldillo_adulto_bueno.value)
      + parseInt(toldillo_adulto_regular.value)
      + parseInt(toldillo_adulto_malo.value)
    )
    const toldillo_adulto_uso = ref(2)
    const toldillo_pedriatico_bueno = ref(2)
    const toldillo_pedriatico_regular = ref(2)
    const toldillo_pedriatico_malo = ref(2)
    const toldillo_pedriatico_total = computed(() =>
      parseInt(toldillo_pedriatico_bueno.value)
      + parseInt(toldillo_pedriatico_regular.value)
      + parseInt(toldillo_pedriatico_malo.value)
    )
    const toldillo_pedriatico_uso = ref(2)
    const toldillo_observaciones = ref('Observaciones')
    const email = ref('prueba@gmail.com')
    const role = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const shows = ref([
      { name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true },
      { name: 'formato', align: 'left', label: 'Formato', field: 'formato', sortable: true },
      //{ name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: false },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: false }
    ])
    const dataMunicipios = ref([])
    const optMunicipios = ref(null)
    const optEntidades = ref(null)
    const optDirecciones = ref(null)
    let establecimientos = ref([])
    const dataEntidades = ref([])
    const dataDirecciones = ref([])

    onMounted(() => {
      getEtv()
      printCurrentPosition()
      getEstablecimientos()         
    })

    const getEtv = async () => {
      visible.value = true
      dataEtv.value = await db.query('SELECT * FROM visitas WHERE formato = "F-EV-04" AND sql_deleted = 0')
      dataEtv.value = dataEtv.value.values
      visible.value = false
    }
    const getEstablecimientos = async () => {
      establecimientos.value = await db.query('SELECT * FROM establecimientos')
      getMunicipios()
    }
    const getMunicipios = async () => {
      dataMunicipios.value = await db.query('SELECT * FROM municipios ORDER BY nom_municipio')
      dataMunicipios.value = dataMunicipios.value.values
    }
 
    watch(() => municipio.value, async (val) => {
      dataEntidades.value = await db.query(`SELECT * FROM establecimientos WHERE dane_municipio = ${val}`)
      dataEntidades.value = dataEntidades.value.values
      console.log(dataEntidades.value)
    })
    watch(() => establecimiento.value, async (val) => {
      dataDirecciones.value = await db.query(`SELECT * FROM establecimientos WHERE doc_establecimiento = ${val}`)
      dataDirecciones.value = dataDirecciones.value.values
      console.log(dataDirecciones.value)
    })

    const filterMunicipios = (val, update) => {
      if (val === '') {
        update(() => {
          optMunicipios.value = dataMunicipios.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        optMunicipios.value = dataMunicipios.value.filter(v => v.nom_municipio.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterEntidades = (val, update) => {
      if (val === '') {
        update(() => {
          optEntidades.value = dataEntidades.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        optEntidades.value = dataEntidades.value.filter(v => v.nom_establecimiento.toLowerCase().indexOf(needle) > -1)
      })
    }
    const filterDirecciones = (val, update) => {
      if (val === '') {
        update(() => {
          optDirecciones.value = dataDirecciones.value
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        optDirecciones.value = dataDirecciones.value.filter(v => v.direccion.toLowerCase().indexOf(needle) > -1)
      })
    }
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition()
      console.log('Current position:', coordinates)
      return coordinates
    }
    const checkGps = async () => {
      try {
        const pru = await Geolocation.checkPermissions()
        return pru.location
      } catch (e) {
        dialogWarning.value = true
        message.value = 'Por favor activa el GPS para poder continuar'
      }
    }
    const limpiarSelect = (nomSelect) => {
      if (nomSelect == 'establecimiento') {
        establecimiento.value = null
      }
      if (nomSelect == 'direccion') {
        direccion.value = null
      }
    }

    const addFieldSet = (type) => {
      if (type == 1) {
        criaderos.value.push({ cantidad: '', tipo: '', ubicacion: '' })
      }
      if (type == 2) {
        criaderosPotencial.value.push({ cantidad: '', tipo: '', ubicacion: '' })
      }
    }
    const removeFieldSet = (index, type) => {
      if (type == 1) {
        criaderos.value.splice(index, 1)
      }
      if (type == 2) {
        criaderosPotencial.value.splice(index, 1)
      }
    }
    
    const showFormat = (row) => {
      message.value = JSON.stringify(row, null, 2)
      dialogWarning.value = true
    }
    const creating = () => {
      // onReset()
      isEditing.value = false
      dialog.value = true
    }

    const onReset = () => {
      coords.value = null
      formato.value = null
      acta.value = null
      fecha.value = null
      dia.value = null
      mes.value = null
      anio.value = null
      municipio.value = null
      establecimiento.value = null
      direccion.value = null
      razon_social.value = null
      telefono.value = null
      caracter_institucional.value = null
      categoria.value = null
      personas_protegidas.value = null
      representante_legal.value = null
      cedula.value = null
      criaderos.value = []
      criaderosPotencial.value = []
      observaciones.value = null
      toldillo_adulto_bueno.value = null
      toldillo_adulto_regular.value = null
      toldillo_adulto_malo.value = null
      toldillo_adulto_total.value = null
      toldillo_adulto_uso.value = null
      toldillo_pedriatico_bueno.value = null
      toldillo_pedriatico_regular.value = null
      toldillo_pedriatico_malo.value = null
      toldillo_pedriatico_total.value = null
      toldillo_pedriatico_uso.value = null
      toldillo_observaciones.value = null
      id.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = async () => {
      if (await checkGps() !== 'granted') {
        await Geolocation.requestPermissions()
        return
      }
      myForm.value.validate().then(async success => {
        if (success) {
          coords.value = await printCurrentPosition()
          const date = fecha.value.split('/')
          const uidd = uid()
          const data = {
            id: uidd,
            identificadorEntrevista: 'F-EV-04',
            versionEntrevista: '5.0',
            usuarioEntrevistador: userName.value,
            idEstablecimiento: direccion.value, // es direccion ya que es el id del establecimiento
            gps: coords.value.coords,
            timestamp: coords.value.timestamp,
            dia: date[2],
            mes: date[1],
            anio: date[0],
            //razon_social: razon_social.value,
            //telefono: telefono.value,
            caracter_institucional: caracter_institucional.value,
            categoria: categoria.value,
            personas_protegidas: personas_protegidas.value,
            //representante_legal: representante_legal.value,
            //cedula: cedula.value,
            criaderos: criaderos.value,
            criaderos_potenciales: criaderosPotencial.value,
            observaciones: observaciones.value,
            toldillo_adulto_bueno: toldillo_adulto_bueno.value,
            toldillo_adulto_regular: toldillo_adulto_regular.value,
            toldillo_adulto_malo: toldillo_adulto_malo.value,
            toldillo_adulto_total: toldillo_adulto_total.value,
            toldillo_adulto_uso: toldillo_adulto_uso.value,
            toldillo_pedriatico_bueno: toldillo_pedriatico_bueno.value,
            toldillo_pedriatico_regular: toldillo_pedriatico_regular.value,
            toldillo_pedriatico_malo: toldillo_pedriatico_malo.value,
            toldillo_pedriatico_total: toldillo_pedriatico_total.value,
            toldillo_pedriatico_uso: toldillo_pedriatico_uso.value,
            toldillo_observaciones: toldillo_observaciones.value,
            email: email.value
          }

          saveFile(data,db)
            .then(() => {
              dialog.value = false
              getEtv()
            }).catch((error) => {
              console.log(error)
              message.value = error.message
              dialogWarning.value = true
            })
        }
        else {
          message.value = 'Faltan campos por llenar, por favor revisa y completa los campos obligatorios *'
          dialogWarning.value = true
        }
      })
    }
    /*const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      coords.value = [row.gps, row.timestamp]
      formato.value = row.formato
      acta.value = row.acta
      fecha.value = `${row.anio}/${row.mes}/${row.dia}`
      municipio.value = row.municipio
      establecimiento.value = row.es
      direccion.value = row.direccion
      razon_social.value = row.razon_social
      telefono.value = row.telefono
      caracter_institucional.value = row.caracter_institucional
      categoria.value = row.categoria
      personas_protegidas.value = row.personas_protegidas
      representante_legal.value = row.representante_legal
      cedula.value = row.cedula
      criaderos.value = row.criaderos
      criaderosPotencial.value = row.criaderos_potenciales
      observaciones.value = row.observaciones
      toldillo_adulto_bueno.value = row.toldillo_adulto_bueno
      toldillo_adulto_regular.value = row.toldillo_adulto_regular
      toldillo_adulto_malo.value = row.toldillo_adulto_malo
      toldillo_adulto_total.value = row.toldillo_adulto_total
      toldillo_adulto_uso.value = row.toldillo_adulto_uso
      toldillo_pedriatico_bueno.value = row.toldillo_pedriatico_bueno
      toldillo_pedriatico_regular.value = row.toldillo_pedriatico_regular
      toldillo_pedriatico_malo.value = row.toldillo_pedriatico_malo
      toldillo_pedriatico_total.value = row.toldillo_pedriatico_total
      toldillo_pedriatico_uso.value = row.toldillo_pedriatico_uso
      toldillo_observaciones.value = row.toldillo_observaciones
      id.value = row.id
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          fecha.value = fecha.value.split('/')
          const data = {
            id: id.value,
            gps: coords.value[0],
            timestamp: coords.value[1],
            acta: acta.value,
            dia: fecha.value[2],
            mes: fecha.value[1],
            anio: fecha.value[0],
            idEstablecimiento: barrio.value,
            direccion: direccion.value,
            razon_social: razon_social.value,
            telefono: telefono.value,
            caracter_institucional: caracter_institucional.value,
            categoria: categoria.value,
            personas_protegidas: personas_protegidas.value,
            representante_legal: representante_legal.value,
            cedula: cedula.value,
            criaderos: criaderos.value,
            criaderos_potenciales: criaderosPotencial.value,
            observaciones: observaciones.value,
            toldillo_adulto_bueno: toldillo_adulto_bueno.value,
            toldillo_adulto_regular: toldillo_adulto_regular.value,
            toldillo_adulto_malo: toldillo_adulto_malo.value,
            toldillo_adulto_total: toldillo_adulto_total.value,
            toldillo_adulto_uso: toldillo_adulto_uso.value,
            toldillo_pedriatico_bueno: toldillo_pedriatico_bueno.value,
            toldillo_pedriatico_regular: toldillo_pedriatico_regular.value,
            toldillo_pedriatico_malo: toldillo_pedriatico_malo.value,
            toldillo_pedriatico_total: toldillo_pedriatico_total.value,
            toldillo_pedriatico_uso: toldillo_pedriatico_uso.value,
            toldillo_observaciones: toldillo_observaciones.value
          }
          saveFile(`${dir}/${formato.value}`, JSON.stringify(data))
            .then(() => {
              dialog.value = false
              getEtv()
            }).catch((error) => {
              console.log(error)
              message.value = error.message
              dialogWarning.value = true
            })
        }
        else {
          message.value = 'Faltan campos por llenar, por favor revisa y completa los campos obligatorios *'
          dialogWarning.value = true

        }
      })
    }*/
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el formato: ' + row.id_form + '?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(async () => {
        await db.execute(`DELETE FROM visitas WHERE id = ${row.id}`)
        .then((res) => {
          console.log(res)
          dialog.value = false
          getEtv()
        })
      })
    }
    return {
      formato,
      tab,
      dialog,
      dialogWarning,
      message,
      dataEtv,
      isEditing,
      role,
      active,
      myForm,
      pagination,
      creating,
      shows,
      visible,
      filter,
      coords,
      acta,
      fecha,
      dia,
      mes,
      anio,
      municipio,
      establecimiento,
      direccion,
      caracter_institucional,
      categoria,
      personas_protegidas,
      representante_legal,
      cedula,
      criaderos,
      criaderosPotencial,
      criadero_cantidad,
      tipo_criaderoOpt,
      observaciones,
      toldillo_adulto_bueno,
      toldillo_adulto_regular,
      toldillo_adulto_malo,
      toldillo_adulto_total,
      toldillo_adulto_uso,
      toldillo_pedriatico_bueno,
      toldillo_pedriatico_regular,
      toldillo_pedriatico_malo,
      toldillo_pedriatico_total,
      toldillo_pedriatico_uso,
      toldillo_observaciones,
      id,
      email,
      onReset,
      onSubmit,
      //editing,
      //onEditing,
      onDelete,
      link,
      limpiarSelect,
      campos,
      lista,
      addFieldSet,
      removeFieldSet,
      showFormat,
      checkGps,
      establecimientos,
      dataMunicipios,
      getMunicipios,
      dataEntidades,
      dataDirecciones,
      filterMunicipios,
      optMunicipios,
      filterEntidades,
      optEntidades,
      filterDirecciones,
      optDirecciones
    }
  }
})
</script>