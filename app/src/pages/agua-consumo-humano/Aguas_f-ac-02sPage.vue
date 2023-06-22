<template>
<q-page class="q-pa-md q-gutter-sm">
<div>
<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div>
<q-space />
<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination" title="Aguas_f-ac-02" :rows="dataAguas_f-ac-02s" :filter="filter" :columns="columns" row-key="name" >
<template v-slot:top-left>
<q-btn unelevated rounded icon="add" color="primary" @click="creating" label="Agregar"/>
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
<q-td key="id" :props="props">
{{ props.row.id }}
</q-td>
<q-td key="fecha" :props="props">
{{ props.row.fecha }}
</q-td>
<q-td key="area_operativa" :props="props">
{{ props.row.area_operativa }}
</q-td>
<q-td key="codigo" :props="props">
{{ props.row.codigo }}
</q-td>
<q-td key="acta" :props="props">
{{ props.row.acta }}
</q-td>
<q-td key="nombre_pp" :props="props">
{{ props.row.nombre_pp }}
</q-td>
<q-td key="nit" :props="props">
{{ props.row.nit }}
</q-td>
<q-td key="sin_nit" :props="props">
{{ props.row.sin_nit }}
</q-td>
<q-td key="departamento" :props="props">
{{ props.row.departamento }}
</q-td>
<q-td key="municipio" :props="props">
{{ props.row.municipio }}
</q-td>
<q-td key="localidad" :props="props">
{{ props.row.localidad }}
</q-td>
<q-td key="otras_localidades" :props="props">
{{ props.row.otras_localidades }}
</q-td>
<q-td key="representante_legal" :props="props">
{{ props.row.representante_legal }}
</q-td>
<q-td key="email" :props="props">
{{ props.row.email }}
</q-td>
<q-td key="direccion" :props="props">
{{ props.row.direccion }}
</q-td>
<q-td key="telefono" :props="props">
{{ props.row.telefono }}
</q-td>
<q-td key="nombre_planta" :props="props">
{{ props.row.nombre_planta }}
</q-td>
<q-td key="caudal_diseño" :props="props">
{{ props.row.caudal_diseño }}
</q-td>
<q-td key="caudal_tratado" :props="props">
{{ props.row.caudal_tratado }}
</q-td>
<q-td key="tipo_fuente_abastecimiento" :props="props">
{{ props.row.tipo_fuente_abastecimiento }}
</q-td>
<q-td key="otras_plantas_operadas" :props="props">
{{ props.row.otras_plantas_operadas }}
</q-td>
<q-td key="suscriptores_atendidos" :props="props">
{{ props.row.suscriptores_atendidos }}
</q-td>
<q-td key="poblacion_atendida" :props="props">
{{ props.row.poblacion_atendida }}
</q-td>
<q-td key="longitud_total_dis" :props="props">
{{ props.row.longitud_total_dis }}
</q-td>
<q-td key="IRCApp" :props="props">
{{ props.row.IRCApp }}
</q-td>
<q-td key="IRABApp" :props="props">
{{ props.row.IRABApp }}
</q-td>
<q-td key="BPSpp" :props="props">
{{ props.row.BPSpp }}
</q-td>
<q-td key="puntaje" :props="props">
{{ props.row.puntaje }}
</q-td>
<q-td key="concepto" :props="props">
{{ props.row.concepto }}
</q-td>
<q-td key="observaciones" :props="props">
{{ props.row.observaciones }}
</q-td>
<q-td key="edit" :props="props">
<q-btn round size="xs" color="primary" icon="border_color" v-on:click="editing(props.row)" />
</q-td>
<q-td key="delete" :props="props">
<q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="onDelete(props.row)" />
</q-td>
</q-tr>
</template>
</q-table>
</div>
</transition>
<q-inner-loading :showing="visible">
<q-spinner-pie color="primary" size="70px"/>
</q-inner-loading>
</div>
<q-dialog v-model="dialog" persistent>
<q-card style="width: 700px; max-width: 80vw;">
<q-linear-progress :value="10" color="blue" />
<q-card-section class="row items-center">
<div class="text-h6"> </div>
<q-space />
<q-btn icon="close" flat round dense v-close-popup />
</q-card-section>
<q-banner class="bg-grey-3">
<template v-slot:avatar>
<q-icon name="warning" color="warning" />
</template>
Los campos marcados con (*) son obligatorios
</q-banner>
<q-card-section>
<q-form ref="myForm" @submit.prevent="">
<div class="row justify-around">
<div class="col-md-4">
<q-input
white
color="blue"
v-model="id"
label="id *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="fecha"
label="fecha *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="area_operativa"
label="area_operativa *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="codigo"
label="codigo *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="acta"
label="acta *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="nombre_pp"
label="nombre_pp *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="nit"
label="nit *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="sin_nit"
label="sin_nit *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="departamento"
label="departamento *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="municipio"
label="municipio *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="localidad"
label="localidad *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="otras_localidades"
label="otras_localidades *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="representante_legal"
label="representante_legal *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="email"
label="email *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="direccion"
label="direccion *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="telefono"
label="telefono *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="nombre_planta"
label="nombre_planta *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="caudal_diseño"
label="caudal_diseño *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="caudal_tratado"
label="caudal_tratado *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="tipo_fuente_abastecimiento"
label="tipo_fuente_abastecimiento *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="otras_plantas_operadas"
label="otras_plantas_operadas *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="suscriptores_atendidos"
label="suscriptores_atendidos *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="poblacion_atendida"
label="poblacion_atendida *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="longitud_total_dis"
label="longitud_total_dis *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="IRCApp"
label="IRCApp *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="IRABApp"
label="IRABApp *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="BPSpp"
label="BPSpp *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="puntaje"
label="puntaje *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="concepto"
label="concepto *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
<div class="col-md-4">
<q-input
white
color="blue"
v-model="observaciones"
label="observaciones *"
lazy-rules
:rules="[ val => !!val || 'El campo es obligatorio']"
/>
</div>
</div>
</q-form>
</q-card-section>
<div class="row justify-between">
<q-card-actions align="left" class="bg-white text-teal">
</q-card-actions>
<q-card-actions align="right" class="bg-white text-teal">
<div v-if="!isEditing">
<q-btn round icon="save" @click.prevent="onSubmit" color="primary"/>
<q-tooltip>Guardar datos</q-tooltip>
</div>
<div v-else>
<q-btn round icon="save" @click.prevent="onEditing" color="primary"/>
<q-tooltip>Editar datos</q-tooltip>
</div> &nbsp;
<div>
<q-btn round icon="cancel" v-close-popup color="negative"/>
<q-tooltip>Cancelar</q-tooltip>
</div>
</q-card-actions>
</div>
</q-card>
</q-dialog>
</q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
export default defineComponent({
  name: 'Aguas_f-ac-02sPage',
  setup () {
    const path = '/aguas_f-ac-02s'
    const dialog = ref(false)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataAguas_f-ac-02s = ref([])
    const id = ref(null)
    const fecha = ref(null)
    const area_operativa = ref(null)
    const codigo = ref(null)
    const acta = ref(null)
    const nombre_pp = ref(null)
    const nit = ref(null)
    const sin_nit = ref(null)
    const departamento = ref(null)
    const municipio = ref(null)
    const localidad = ref(null)
    const otras_localidades = ref(null)
    const representante_legal = ref(null)
    const email = ref(null)
    const direccion = ref(null)
    const telefono = ref(null)
    const nombre_planta = ref(null)
    const caudal_diseño = ref(null)
    const caudal_tratado = ref(null)
    const tipo_fuente_abastecimiento = ref(null)
    const otras_plantas_operadas = ref(null)
    const suscriptores_atendidos = ref(null)
    const poblacion_atendida = ref(null)
    const longitud_total_dis = ref(null)
    const IRCApp = ref(null)
    const IRABApp = ref(null)
    const BPSpp = ref(null)
    const puntaje = ref(null)
    const concepto = ref(null)
    const observaciones = ref(null)
    const role = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const columns = ref([
      { name: 'id', align: 'center', label: 'id', field: 'id', sortable: true },
      { name: 'fecha', align: 'center', label: 'fecha', field: 'fecha', sortable: true },
      { name: 'area_operativa', align: 'center', label: 'area_operativa', field: 'area_operativa', sortable: true },
      { name: 'codigo', align: 'center', label: 'codigo', field: 'codigo', sortable: true },
      { name: 'acta', align: 'center', label: 'acta', field: 'acta', sortable: true },
      { name: 'nombre_pp', align: 'center', label: 'nombre_pp', field: 'nombre_pp', sortable: true },
      { name: 'nit', align: 'center', label: 'nit', field: 'nit', sortable: true },
      { name: 'sin_nit', align: 'center', label: 'sin_nit', field: 'sin_nit', sortable: true },
      { name: 'departamento', align: 'center', label: 'departamento', field: 'departamento', sortable: true },
      { name: 'municipio', align: 'center', label: 'municipio', field: 'municipio', sortable: true },
      { name: 'localidad', align: 'center', label: 'localidad', field: 'localidad', sortable: true },
      { name: 'otras_localidades', align: 'center', label: 'otras_localidades', field: 'otras_localidades', sortable: true },
      { name: 'representante_legal', align: 'center', label: 'representante_legal', field: 'representante_legal', sortable: true },
      { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
      { name: 'direccion', align: 'center', label: 'direccion', field: 'direccion', sortable: true },
      { name: 'telefono', align: 'center', label: 'telefono', field: 'telefono', sortable: true },
      { name: 'nombre_planta', align: 'center', label: 'nombre_planta', field: 'nombre_planta', sortable: true },
      { name: 'caudal_diseño', align: 'center', label: 'caudal_diseño', field: 'caudal_diseño', sortable: true },
      { name: 'caudal_tratado', align: 'center', label: 'caudal_tratado', field: 'caudal_tratado', sortable: true },
      { name: 'tipo_fuente_abastecimiento', align: 'center', label: 'tipo_fuente_abastecimiento', field: 'tipo_fuente_abastecimiento', sortable: true },
      { name: 'otras_plantas_operadas', align: 'center', label: 'otras_plantas_operadas', field: 'otras_plantas_operadas', sortable: true },
      { name: 'suscriptores_atendidos', align: 'center', label: 'suscriptores_atendidos', field: 'suscriptores_atendidos', sortable: true },
      { name: 'poblacion_atendida', align: 'center', label: 'poblacion_atendida', field: 'poblacion_atendida', sortable: true },
      { name: 'longitud_total_dis', align: 'center', label: 'longitud_total_dis', field: 'longitud_total_dis', sortable: true },
      { name: 'IRCApp', align: 'center', label: 'IRCApp', field: 'IRCApp', sortable: true },
      { name: 'IRABApp', align: 'center', label: 'IRABApp', field: 'IRABApp', sortable: true },
      { name: 'BPSpp', align: 'center', label: 'BPSpp', field: 'BPSpp', sortable: true },
      { name: 'puntaje', align: 'center', label: 'puntaje', field: 'puntaje', sortable: true },
      { name: 'concepto', align: 'center', label: 'concepto', field: 'concepto', sortable: true },
      { name: 'observaciones', align: 'center', label: 'observaciones', field: 'observaciones', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getAguas_f-ac-02s()
    })
    const getAguas_f-ac-02s = async () => {
      visible.value = true
      const { data } = await api.get(path)
      dataAguas_f-ac-02s.value = data
      visible.value = false
    }
    const creating = () => {
      onReset()
      dialog.value = true
    }
    const onReset = () => {
      id.value = null
      fecha.value = null
      area_operativa.value = null
      codigo.value = null
      acta.value = null
      nombre_pp.value = null
      nit.value = null
      sin_nit.value = null
      departamento.value = null
      municipio.value = null
      localidad.value = null
      otras_localidades.value = null
      representante_legal.value = null
      email.value = null
      direccion.value = null
      telefono.value = null
      nombre_planta.value = null
      caudal_diseño.value = null
      caudal_tratado.value = null
      tipo_fuente_abastecimiento.value = null
      otras_plantas_operadas.value = null
      suscriptores_atendidos.value = null
      poblacion_atendida.value = null
      longitud_total_dis.value = null
      IRCApp.value = null
      IRABApp.value = null
      BPSpp.value = null
      puntaje.value = null
      concepto.value = null
      observaciones.value = null
      isEditing.value = false
      active.value = false
    }
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.post(path, {
            id: id.value,
            fecha: fecha.value,
            area_operativa: area_operativa.value,
            codigo: codigo.value,
            acta: acta.value,
            nombre_pp: nombre_pp.value,
            nit: nit.value,
            sin_nit: sin_nit.value,
            departamento: departamento.value,
            municipio: municipio.value,
            localidad: localidad.value,
            otras_localidades: otras_localidades.value,
            representante_legal: representante_legal.value,
            email: email.value,
            direccion: direccion.value,
            telefono: telefono.value,
            nombre_planta: nombre_planta.value,
            caudal_diseño: caudal_diseño.value,
            caudal_tratado: caudal_tratado.value,
            tipo_fuente_abastecimiento: tipo_fuente_abastecimiento.value,
            otras_plantas_operadas: otras_plantas_operadas.value,
            suscriptores_atendidos: suscriptores_atendidos.value,
            poblacion_atendida: poblacion_atendida.value,
            longitud_total_dis: longitud_total_dis.value,
            IRCApp: IRCApp.value,
            IRABApp: IRABApp.value,
            BPSpp: BPSpp.value,
            puntaje: puntaje.value,
            concepto: concepto.value,
            observaciones: observaciones.value,
          }).then(() => {
            dialog.value = false
            getAguas_f-ac-02s()
          })
        }
      })
    }
    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      id.value = row.id
      fecha.value = row.fecha
      area_operativa.value = row.area_operativa
      codigo.value = row.codigo
      acta.value = row.acta
      nombre_pp.value = row.nombre_pp
      nit.value = row.nit
      sin_nit.value = row.sin_nit
      departamento.value = row.departamento
      municipio.value = row.municipio
      localidad.value = row.localidad
      otras_localidades.value = row.otras_localidades
      representante_legal.value = row.representante_legal
      email.value = row.email
      direccion.value = row.direccion
      telefono.value = row.telefono
      nombre_planta.value = row.nombre_planta
      caudal_diseño.value = row.caudal_diseño
      caudal_tratado.value = row.caudal_tratado
      tipo_fuente_abastecimiento.value = row.tipo_fuente_abastecimiento
      otras_plantas_operadas.value = row.otras_plantas_operadas
      suscriptores_atendidos.value = row.suscriptores_atendidos
      poblacion_atendida.value = row.poblacion_atendida
      longitud_total_dis.value = row.longitud_total_dis
      IRCApp.value = row.IRCApp
      IRABApp.value = row.IRABApp
      BPSpp.value = row.BPSpp
      puntaje.value = row.puntaje
      concepto.value = row.concepto
      observaciones.value = row.observaciones
    }
    const onEditing = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          api.patch(path + '/' + id.value, {
            id: id.value,
            fecha: fecha.value,
            area_operativa: area_operativa.value,
            codigo: codigo.value,
            acta: acta.value,
            nombre_pp: nombre_pp.value,
            nit: nit.value,
            sin_nit: sin_nit.value,
            departamento: departamento.value,
            municipio: municipio.value,
            localidad: localidad.value,
            otras_localidades: otras_localidades.value,
            representante_legal: representante_legal.value,
            email: email.value,
            direccion: direccion.value,
            telefono: telefono.value,
            nombre_planta: nombre_planta.value,
            caudal_diseño: caudal_diseño.value,
            caudal_tratado: caudal_tratado.value,
            tipo_fuente_abastecimiento: tipo_fuente_abastecimiento.value,
            otras_plantas_operadas: otras_plantas_operadas.value,
            suscriptores_atendidos: suscriptores_atendidos.value,
            poblacion_atendida: poblacion_atendida.value,
            longitud_total_dis: longitud_total_dis.value,
            IRCApp: IRCApp.value,
            IRABApp: IRABApp.value,
            BPSpp: BPSpp.value,
            puntaje: puntaje.value,
            concepto: concepto.value,
            observaciones: observaciones.value,
          }).then(() => {
            dialog.value = false
            getAguas_f-ac-02s()
          })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar la aguas_f-ac-02: ' + row.id + '?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        api.delete(path + '/' + row.id).then(response => {
          dialog.value = false
          getAguas_f-ac-02s()
        })
      })
    }
    return {
      dialog,
      dataAguas_f-ac-02s,
      isEditing,
      role,
      active,
      myForm,
      pagination,
      creating,
      columns,
      visible,
      filter,
      id,
      fecha,
      area_operativa,
      codigo,
      acta,
      nombre_pp,
      nit,
sin_nit,
      departamento,
      municipio,
      localidad,
      otras_localidades,
      representante_legal,
      email,
      direccion,
      telefono,
      nombre_planta,
      caudal_diseño,
      caudal_tratado,
      tipo_fuente_abastecimiento,
      otras_plantas_operadas,
      suscriptores_atendidos,
      poblacion_atendida,
      longitud_total_dis,
      IRCApp,
      IRABApp,
      BPSpp,
      puntaje,
      concepto,
      observaciones,
      onReset,
      onSubmit,
      editing,
      onEditing,
      id,
      onDelete,
    }
  }
})
</script>
