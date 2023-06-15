<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div>
          <q-space />
          <q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Etv_fv-ev-04" :rows="dataEtv" :filter="filter" :columns="shows" row-key="name">
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
                <q-td key="formato" :props="props">
                  <q-btn flat style="color: rgb(10,30,200);" :label="props.row.formato" />
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
          <!--<q-table dense :rows-per-page-options="[10, 15, 20, 25, 50, 0]" v-model:pagination="pagination"
            title="Etv_fv-ev-04" :rows="dataEtv" :filter="filter" :columns="columns" row-key="name">
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
                <q-td key="formato" :props="props">
                  {{ props.row.formato }}
                </q-td>
                <q-td key="acta" :props="props">
                  {{ props.row.acta }}
                </q-td>
                <q-td key="fecha" :props="props">
                  {{ props.row.fecha }}
                </q-td>
                <q-td key="municipio" :props="props">
                  {{ props.row.municipio }}
                </q-td>
                <q-td key="barrio" :props="props">
                  {{ props.row.barrio }}
                </q-td>
                <q-td key="comuna" :props="props">
                  {{ props.row.comuna }}
                </q-td>
                <q-td key="direccion" :props="props">
                  {{ props.row.direccion }}
                </q-td>
                <q-td key="razon_social" :props="props">
                  {{ props.row.razon_social }}
                </q-td>
                <q-td key="telefono" :props="props">
                  {{ props.row.telefono }}
                </q-td>
                <q-td key="caracterInstitucional" :props="props">
                  {{ props.row.caracterInstitucional }}
                </q-td>
                <q-td key="publica" :props="props">
                  {{ props.row.publica }}
                </q-td>
                <q-td key="privada" :props="props">
                  {{ props.row.privada }}
                </q-td>
                <q-td key="categoria" :props="props">
                  {{ props.row.categoria }}
                </q-td>
                <q-td key="personas_protegidas" :props="props">
                  {{ props.row.personas_protegidas }}
                </q-td>
                <q-td key="representante_legal" :props="props">
                  {{ props.row.representante_legal }}
                </q-td>
                <q-td key="cedula" :props="props">
                  {{ props.row.cedula }}
                </q-td>
                <q-td key="criadero_cantidad" :props="props">
                  {{ props.row.criadero_cantidad }}
                </q-td>
                <q-td key="tipo_criadero" :props="props">
                  {{ props.row.tipo_criadero }}
                </q-td>
                <q-td key="criadero_ubicacion" :props="props">
                  {{ props.row.criadero_ubicacion }}
                </q-td>
                <q-td key="criadero_potencial_cantidad" :props="props">
                  {{ props.row.criadero_potencial_cantidad }}
                </q-td>
                <q-td key="tipo_criadero_potencial" :props="props">
                  {{ props.row.tipo_criadero_potencial }}
                </q-td>
                <q-td key="criadero_potencial_ubicacion" :props="props">
                  {{ props.row.criadero_potencial_ubicacion }}
                </q-td>
                <q-td key="observaciones" :props="props">
                  {{ props.row.observaciones }}
                </q-td>
                <q-td key="toldillo_adulto_bueno" :props="props">
                  {{ props.row.toldillo_adulto_bueno }}
                </q-td>
                <q-td key="toldillo_adulto_regular" :props="props">
                  {{ props.row.toldillo_adulto_regular }}
                </q-td>
                <q-td key="toldillo_adulto_malo" :props="props">
                  {{ props.row.toldillo_adulto_malo }}
                </q-td>
                <q-td key="toldillo_adulto_total" :props="props">
                  {{ props.row.toldillo_adulto_total }}
                </q-td>
                <q-td key="toldillo_adulto_uso" :props="props">
                  {{ props.row.toldillo_adulto_uso }}
                </q-td>
                <q-td key="toldillo_pedriatico_bueno" :props="props">
                  {{ props.row.toldillo_pedriatico_bueno }}
                </q-td>
                <q-td key="toldillo_pedriatico_regular" :props="props">
                  {{ props.row.toldillo_pedriatico_regular }}
                </q-td>
                <q-td key="toldillo_pedriatico_malo" :props="props">
                  {{ props.row.toldillo_pedriatico_malo }}
                </q-td>
                <q-td key="toldillo_pedriatico_total" :props="props">
                  {{ props.row.toldillo_pedriatico_total }}
                </q-td>
                <q-td key="toldillo_pedriatico_uso" :props="props">
                  {{ props.row.toldillo_pedriatico_uso }}
                </q-td>
                <q-td key="toldillo_observaciones" :props="props">
                  {{ props.row.toldillo_observaciones }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn round size="xs" color="primary" icon="border_color" v-on:click="editing(props.row)" />
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round size="xs" color="negative" icon="delete_forever" v-on:click="onDelete(props.row)" />
                </q-td>
              </q-tr>
            </template>
          </q-table>-->
        </div>
      </transition>
      <q-inner-loading :showing="visible">
        <q-spinner-pie color="primary" size="70px" />
      </q-inner-loading>
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 800px; max-width: 95vw;">
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
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="acta" label="Acta *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input filled v-model="fecha" mask="date" :rules="['date']">
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
                <q-input white color="blue" v-model="municipio" label="Municipio *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="barrio" label="Barrio *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="comuna" label="Comuna / Sector *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="direccion" label="Dirección *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="razon_social" label="Razón social *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="telefono" label="Teléfono *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-select v-model="caracterInstitucional" label="Caracter institucional *"
                  :options="[{ label: 'Pública', value: 'publica' }, { label: 'Privada', value: 'privada' }, { label: 'Categoría', value: 'categoria' }]"
                  emit-value map-options lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" type="number" v-model="personas_protegidas" label="# de personas protegidas *"
                  lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="representante_legal" label="Representante legal *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" type="number" v-model="cedula" label="Cédula *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="q-pa-md bg-primary text-white text-center text-bold col-md-12 col-sm-12 col-xs-12">
                Criaderos o focos encontrados de:
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" type="number" v-model="criadero_cantidad" label="Cantidad *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-select v-model="tipo_criadero" label="Tipo criadero o foco *" :options="tipo_criaderoOpt"
                  option-value="id" option-label="description" emit-value map-options lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
                <q-input white color="blue" v-model="tipo_criadero" label="Tipo criadero o foco *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="criadero_ubicacion" label="Lugar donde se ubica(n) *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="criadero_potencial_cantidad" label="criadero_potencial_cantidad *"
                  lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="tipo_criadero_potencial" label="tipo_criadero_potencial *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="criadero_potencial_ubicacion" label="criadero_potencial_ubicacion *"
                  lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="observaciones" label="observaciones *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_adulto_bueno" label="toldillo_adulto_bueno *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_adulto_regular" label="toldillo_adulto_regular *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_adulto_malo" label="toldillo_adulto_malo *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_adulto_total" label="toldillo_adulto_total *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_adulto_uso" label="toldillo_adulto_uso *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_pedriatico_bueno" label="toldillo_pedriatico_bueno *"
                  lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_pedriatico_regular" label="toldillo_pedriatico_regular *"
                  lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_pedriatico_malo" label="toldillo_pedriatico_malo *"
                  lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_pedriatico_total" label="toldillo_pedriatico_total *"
                  lazy-rules :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_pedriatico_uso" label="toldillo_pedriatico_uso *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="toldillo_observaciones" label="toldillo_observaciones *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="email" label="Correo electronico *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <q-input white color="blue" v-model="id" label="id *" lazy-rules
                  :rules="[val => !!val || 'El campo es obligatorio']" />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <div class="row justify-between">
          <q-card-actions align="left" class="bg-white text-teal">
          </q-card-actions>
          <q-card-actions align="right" class="bg-white text-teal">
            <div v-if="!isEditing">
              <q-btn round icon="save" @click.prevent="onSubmit" color="primary" />
              <q-tooltip>Guardar datos</q-tooltip>
            </div>
            <div v-else>
              <q-btn round icon="save" @click.prevent="onEditing" color="primary" />
              <q-tooltip>Editar datos</q-tooltip>
            </div> &nbsp;
            <div>
              <q-btn round icon="cancel" v-close-popup color="negative" />
              <q-tooltip>Cancelar</q-tooltip>
            </div>
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogWarning" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Información</div>
          {{ 'Mensaje: ' + message }}
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <div>
            <q-btn round icon="cancel" v-close-popup color="negative" />
            <q-tooltip>Cerrar</q-tooltip>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { TIPOCRIADERO } from '../../constants/constants'
import { versionOS } from 'src/stores/global'
// import { Device } from '@capacitor/device'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

export default defineComponent({
  name: 'FV-EV-04Page',
  setup() {
    const formato = ref(null)
    const path = '/etv'
    const link = ref(null)
    const dialog = ref(false)
    const dialogWarning = ref(false)
    const message = ref(null)
    const visible = ref(false)
    const id = ref(null)
    const filter = ref(null)
    const dataEtv = ref([])
    const acta = ref(1)
    const fecha = ref('2023-06-12')
    const municipio = ref('Obando')
    const barrio = ref('El laurel')
    const comuna = ref(13)
    const direccion = ref('Cra 2 5-46')
    const razon_social = ref('Prueba')
    const telefono = ref(2123354)
    const caracterInstitucional = ref(null)
    const publica = ref(null)
    const privada = ref(null)
    const categoria = ref(null)
    const personas_protegidas = ref(2)
    const representante_legal = ref('Alonso')
    const cedula = ref(1245787)
    const criadero_cantidad = ref(2)
    const tipo_criadero = ref(null)
    const tipo_criaderoOpt = ref(TIPOCRIADERO)
    const criadero_ubicacion = ref('Patio')
    const criadero_potencial_cantidad = ref(2)
    const tipo_criadero_potencial = ref('Llanta')
    const criadero_potencial_ubicacion = ref('Patio')
    const observaciones = ref('Ninguna')
    const toldillo_adulto_bueno = ref(2)
    const toldillo_adulto_regular = ref(2)
    const toldillo_adulto_malo = ref(2)
    const toldillo_adulto_total = ref(2)
    const toldillo_adulto_uso = ref(2)
    const toldillo_pedriatico_bueno = ref(2)
    const toldillo_pedriatico_regular = ref(2)
    const toldillo_pedriatico_malo = ref(2)
    const toldillo_pedriatico_total = ref(2)
    const toldillo_pedriatico_uso = ref(2)
    const toldillo_observaciones = ref(2)
    const email = ref('keagmo@gmail.com')
    const role = ref(null)
    const active = ref(false)
    const myForm = ref(null)
    const $q = useQuasar()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const isEditing = ref(false)
    const shows = ref([
      { name: 'formato', align: 'left', label: 'Formato', field: 'formato', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    const columns = ref([
      { name: 'formato', align: 'center', label: 'Formato', field: 'formato', sortable: true },
      { name: 'acta', align: 'center', label: 'acta', field: 'acta', sortable: true },
      { name: 'fecha', align: 'center', label: 'fecha', field: 'fecha', sortable: true },
      { name: 'municipio', align: 'center', label: 'municipio', field: 'municipio', sortable: true },
      { name: 'barrio', align: 'center', label: 'barrio', field: 'barrio', sortable: true },
      { name: 'comuna', align: 'center', label: 'comuna', field: 'comuna', sortable: true },
      { name: 'direccion', align: 'center', label: 'direccion', field: 'direccion', sortable: true },
      { name: 'razon_social', align: 'center', label: 'razon_social', field: 'razon_social', sortable: true },
      { name: 'telefono', align: 'center', label: 'telefono', field: 'telefono', sortable: true },
      { name: 'caracterInstitucional', align: 'center', label: 'Caracter institucional', field: 'caracterInstitucional', sortable: true },
      { name: 'publica', align: 'center', label: 'publica', field: 'publica', sortable: true },
      { name: 'privada', align: 'center', label: 'privada', field: 'privada', sortable: true },
      { name: 'categoria', align: 'center', label: 'categoria', field: 'categoria', sortable: true },
      { name: 'personas_protegidas', align: 'center', label: 'personas_protegidas', field: 'personas_protegidas', sortable: true },
      { name: 'representante_legal', align: 'center', label: 'representante_legal', field: 'representante_legal', sortable: true },
      { name: 'cedula', align: 'center', label: 'cedula', field: 'cedula', sortable: true },
      { name: 'criadero_cantidad', align: 'center', label: 'criadero_cantidad', field: 'criadero_cantidad', sortable: true },
      { name: 'tipo_criadero', align: 'center', label: 'tipo_criadero', field: 'tipo_criadero', sortable: true },
      { name: 'criadero_ubicacion', align: 'center', label: 'criadero_ubicacion', field: 'criadero_ubicacion', sortable: true },
      { name: 'criadero_potencial_cantidad', align: 'center', label: 'criadero_potencial_cantidad', field: 'criadero_potencial_cantidad', sortable: true },
      { name: 'tipo_criadero_potencial', align: 'center', label: 'tipo_criadero_potencial', field: 'tipo_criadero_potencial', sortable: true },
      { name: 'criadero_potencial_ubicacion', align: 'center', label: 'criadero_potencial_ubicacion', field: 'criadero_potencial_ubicacion', sortable: true },
      { name: 'observaciones', align: 'center', label: 'observaciones', field: 'observaciones', sortable: true },
      { name: 'toldillo_adulto_bueno', align: 'center', label: 'toldillo_adulto_bueno', field: 'toldillo_adulto_bueno', sortable: true },
      { name: 'toldillo_adulto_regular', align: 'center', label: 'toldillo_adulto_regular', field: 'toldillo_adulto_regular', sortable: true },
      { name: 'toldillo_adulto_malo', align: 'center', label: 'toldillo_adulto_malo', field: 'toldillo_adulto_malo', sortable: true },
      { name: 'toldillo_adulto_total', align: 'center', label: 'toldillo_adulto_total', field: 'toldillo_adulto_total', sortable: true },
      { name: 'toldillo_adulto_uso', align: 'center', label: 'toldillo_adulto_uso', field: 'toldillo_adulto_uso', sortable: true },
      { name: 'toldillo_pedriatico_bueno', align: 'center', label: 'toldillo_pedriatico_bueno', field: 'toldillo_pedriatico_bueno', sortable: true },
      { name: 'toldillo_pedriatico_regular', align: 'center', label: 'toldillo_pedriatico_regular', field: 'toldillo_pedriatico_regular', sortable: true },
      { name: 'toldillo_pedriatico_malo', align: 'center', label: 'toldillo_pedriatico_malo', field: 'toldillo_pedriatico_malo', sortable: true },
      { name: 'toldillo_pedriatico_total', align: 'center', label: 'toldillo_pedriatico_total', field: 'toldillo_pedriatico_total', sortable: true },
      { name: 'toldillo_pedriatico_uso', align: 'center', label: 'toldillo_pedriatico_uso', field: 'toldillo_pedriatico_uso', sortable: true },
      { name: 'toldillo_observaciones', align: 'center', label: 'toldillo_observaciones', field: 'toldillo_observaciones', sortable: true },
      { name: 'email', align: 'center', label: 'Correo electronico', field: 'email', sortable: true },
      { name: 'id', align: 'center', label: 'id', field: 'id', sortable: true },
      { name: 'edit', align: 'center', label: 'Editar', field: 'edit', sortable: true },
      { name: 'delete', align: 'center', label: 'Eliminar', field: 'delete', sortable: true }
    ])
    onMounted(() => {
      getEtv()
      // getVersion()
      // writeSecretFileA()
      // readSecretFileA()
      // ruta()
      console.log(versionOS.version)
    })
    const getEtv = async () => {
      visible.value = true
      const result = await Filesystem.readdir({
        path: 'visitas/ETV',
        directory: Directory.Data
      })
      const data = []
      for (const item of result.files) {
        const temp = await readFile(`visitas/ETV/${item.name}`)
        temp.formato = item.name
        data.push(temp)
      }
      console.log(data)
      dataEtv.value = data
      visible.value = false
    }
    /* async function getVersion() {
      const info = await Device.getInfo();
      console.log('Versión de Android:', info.osVersion);
    } */
    const saveFile = async (path, data) => {
      console.log(data)
      await Filesystem.writeFile({
        path: path,
        data: data,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })
    }
    /*
    const readSecretFile = async () => {
      const contents = await Filesystem.readFile({
        path: 'text.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      console.log('secrets:', contents);
    }; */
    /* const writeSecretFileA = async () => {
      await Filesystem.writeFile({
        path: 'text.txt',
        data: 'This is a test data',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    };
    const readSecretFileA = async () => {
      const contents = await Filesystem.readFile({
        path: 'prueba.vue',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });

      console.log('secrets:', contents.data);
    };
    const ruta = async () => {
      try {
        const route = await Filesystem.getUri({
          path: 'prueba.html',
          directory: Directory.Data
        });

        console.log('ruta:', route.uri)
        link.value = route.uri
      } catch (error) {
        console.error('error:', error)
      }

    } */
    const readFile = async (path) => {
      const result = await Filesystem.readFile({
        path: path,
        directory: Directory.Data,
        encoding: Encoding.UTF8
      })
      const obj = JSON.parse(result.data)
      return obj
    }

    const creating = () => {
      // onReset()
      dialog.value = true
    }
    const onReset = () => {
      formato.value = null
      acta.value = null
      fecha.value = null
      municipio.value = null
      barrio.value = null
      comuna.value = null
      direccion.value = null
      razon_social.value = null
      telefono.value = null
      publica.value = null
      privada.value = null
      categoria.value = null
      personas_protegidas.value = null
      representante_legal.value = null
      cedula.value = null
      criadero_cantidad.value = null
      tipo_criadero.value = null
      criadero_ubicacion.value = null
      criadero_potencial_cantidad.value = null
      tipo_criadero_potencial.value = null
      criadero_potencial_ubicacion.value = null
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
    const onSubmit = () => {
      myForm.value.validate().then(async success => {
        if (success) {
          const data = {
            acta: acta.value,
            fecha: fecha.value,
            municipio: municipio.value,
            barrio: barrio.value,
            comuna: comuna.value,
            direccion: direccion.value,
            razon_social: razon_social.value,
            telefono: telefono.value,
            caracterInstitucional: caracterInstitucional.value,
            publica: publica.value,
            privada: privada.value,
            categoria: categoria.value,
            personas_protegidas: personas_protegidas.value,
            representante_legal: representante_legal.value,
            cedula: cedula.value,
            criadero_cantidad: criadero_cantidad.value,
            tipo_criadero: tipo_criadero.value,
            criadero_ubicacion: criadero_ubicacion.value,
            criadero_potencial_cantidad: criadero_potencial_cantidad.value,
            tipo_criadero_potencial: tipo_criadero_potencial.value,
            criadero_potencial_ubicacion: criadero_potencial_ubicacion.value,
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
            id: id.value
          }
          const consecutivo = await readFile('count.json')

          console.log(consecutivo.count)
          saveFile(`visitas/ETV/${consecutivo.count}-FV-EV-04.json`, JSON.stringify(data))
            .then(() => {
              saveFile('count.json', JSON.stringify({ count: consecutivo.count + 1 }))
              dialog.value = false
              getEtv()
            }).catch((error) => {
              console.log(error)
              message.value = error.message
              dialogWarning.value = true
            })
        }
        //console.log(JSON.stringify(data))
      })
    }
    const editing = (row) => {
      onReset()
      dialog.value = true
      isEditing.value = true
      id.value = row.id
      formato.value = row.formato
      acta.value = row.acta
      fecha.value = row.fecha
      municipio.value = row.municipio
      barrio.value = row.barrio
      comuna.value = row.comuna
      direccion.value = row.direccion
      razon_social.value = row.razon_social
      telefono.value = row.telefono
      caracterInstitucional.value = row.caracterInstitucional
      publica.value = row.publica
      privada.value = row.privada
      categoria.value = row.categoria
      personas_protegidas.value = row.personas_protegidas
      representante_legal.value = row.representante_legal
      cedula.value = row.cedula
      criadero_cantidad.value = row.criadero_cantidad
      tipo_criadero.value = row.tipo_criadero
      criadero_ubicacion.value = row.criadero_ubicacion
      criadero_potencial_cantidad.value = row.criadero_potencial_cantidad
      tipo_criadero_potencial.value = row.tipo_criadero_potencial
      criadero_potencial_ubicacion.value = row.criadero_potencial_ubicacion
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
          const data = {
            acta: acta.value,
            fecha: fecha.value,
            municipio: municipio.value,
            barrio: barrio.value,
            comuna: comuna.value,
            direccion: direccion.value,
            razon_social: razon_social.value,
            telefono: telefono.value,
            publica: publica.value,
            privada: privada.value,
            categoria: categoria.value,
            personas_protegidas: personas_protegidas.value,
            representante_legal: representante_legal.value,
            cedula: cedula.value,
            criadero_cantidad: criadero_cantidad.value,
            tipo_criadero: tipo_criadero.value,
            criadero_ubicacion: criadero_ubicacion.value,
            criadero_potencial_cantidad: criadero_potencial_cantidad.value,
            tipo_criadero_potencial: tipo_criadero_potencial.value,
            criadero_potencial_ubicacion: criadero_potencial_ubicacion.value,
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
            id: id.value
          }
          saveFile(`visitas/ETV/${formato.value}`, JSON.stringify(data))
            .then(() => {
              dialog.value = false
              getEtv()
            }).catch((error) => {
              console.log(error)
              message.value = error.message
              dialogWarning.value = true
            })
        }
      })
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el formato: ' + row.formato + '?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(async () => {
        await Filesystem.deleteFile({
          path: `visitas/ETV/${row.formato}`,
          directory: Directory.Data
        }).then(() => {
          dialog.value = false
          getEtv()
        })
      })
    }
    return {
      formato,
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
      columns,
      visible,
      filter,
      acta,
      fecha,
      municipio,
      barrio,
      comuna,
      direccion,
      razon_social,
      telefono,
      caracterInstitucional,
      publica,
      privada,
      categoria,
      personas_protegidas,
      representante_legal,
      cedula,
      criadero_cantidad,
      tipo_criaderoOpt,
      tipo_criadero,
      criadero_ubicacion,
      criadero_potencial_cantidad,
      tipo_criadero_potencial,
      criadero_potencial_ubicacion,
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
      editing,
      onEditing,
      onDelete,
      link
    }
  }
})
</script>