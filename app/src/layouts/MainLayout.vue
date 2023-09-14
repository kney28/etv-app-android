<template>
  <q-inner-loading :showing="visible" class="z-max">
    <q-spinner-facebook color="primary" size="140px" />
    <div style="font-size: 10px;">Preparando el entorno...</div>
  </q-inner-loading>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>UESVALLE</q-toolbar-title>

        <q-fab
          color="blue-grey-2"
          text-color="blue-grey-8"
          icon="fa-solid fa-gear"
          padding="xs"
          direction="down"
        >
          <q-fab-action external-label label-position="left" label="Salir" color="cyan" @click="logout" icon="fa-solid fa-sign-out-alt" />
          <q-fab-action external-label label-position="left" label="Configuración" to="/config/Config" color="deep-purple" icon="fa-solid fa-user-gear" />
        </q-fab>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menú
        </q-item-label>

        <q-item active-class="tab-active" to="/" exact class="navigation-item" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="orange" name="fa-solid fa-house" />
          </q-item-section>

          <q-item-section>
            Dashboard
          </q-item-section>
        </q-item>

        <q-separator></q-separator>

        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="fa-regular fa-pen-to-square" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              Actividades
            </q-item-section>
          </template>
          <q-expansion-item :header-inset-level="0.2" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="fa-solid fa-mosquito" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                Enfermedades transmitidas por vectores
              </q-item-section>
            </template>

            <q-item active-class="tab-active" to="/etv/F-EV-04" exact class="q-ma-sm navigation-item" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="black" name="fa-solid fa-marker" />
              </q-item-section>

              <q-item-section>
                Formulario F-EV-04
              </q-item-section>
            </q-item>
          </q-expansion-item>

        </q-expansion-item>

        <q-separator></q-separator>

        <q-item @click="upload()" active-class="tab-active" exact class="q-ma-sm navigation-item" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fa-solid fa-cloud-arrow-up" />
          </q-item-section>

          <q-item-section>
            Enviar
          </q-item-section>
        </q-item>

        <q-item active-class="tab-active" to="/profiles" exact
          class="q-ma-sm navigation-item" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="green" name="fa-solid fa-share-nodes" />
          </q-item-section>

          <q-item-section>
            Compartir
          </q-item-section>
        </q-item>
      </q-list>
      <br>
      <div class="col-lg-12 col-md-12 col-xs-12 text-left">
        <q-toggle 
          v-model="dark"
          checked-icon="fa-solid fa-moon"
          color="blue-grey"
          unchecked-icon="fa-solid fa-sun"
          size="lg"
          label="Modo oscuro"
          @update:model-value="(val) => $q.dark.set(val)"
        />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="dialogInfo" persistent>
      <q-card>
        <q-card-section>
          <div class="row q-mb-sm">
            <div class="col-lg-8 col-md-8 col-xs-8 text-h6">
            </div>
            <div class="col-lg-4 col-md-4 col-xs-4 text-right">
              <q-btn icon="close" flat round dense v-close-popup />
            </div>
          </div>
          <q-markup-table>
            <thead>
              <tr>
                <th colspan="2" class="text-center bg-black text-yellow-7">Resumen de la operación</th>
              </tr>
              <tr>
                <th class="text-left">Archivo</th>
                <th class="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dato, index) in datos.nom_exitosos" :key="index">
                <td>{{ dato }}</td>
                <td class="text-center"><q-avatar text-color="white" size="xs" round color="green"
                    icon="fa-solid fa-check"></q-avatar></td>
              </tr>
              <tr v-for="(dato, index) in datos.nom_fallidos" :key="index">
                <td>{{ dato }}</td>
                <td class="text-center"><q-avatar text-color="white" size="xs" round color="red"
                    icon="fa-solid fa-xmark"></q-avatar></td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
        <q-card-section>
          <div class="row shadow-2 q-pa-sm">
            <div class="col-lg-12 col-md-12 col-xs-12">

              Archivos enviados: {{ datos.enviados }}
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12">
              Archivos almacenados: {{ datos.almacenados }}
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12">
              Archivos no almacenados: {{ datos.no_almacenados }}
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12 q-pt-md" style="font-size: 10px; font-style: italic;">
              Se ha realizado un registro (log) de los detalles de la transmisión de datos,
              incluyendo la información de los archivos enviados
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-teal">
          <div>
            <q-btn flat round dense v-close-popup label="Ok" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { conexionBD } from 'src/stores/conexionBD';
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/axios';
import { generateDate } from 'src/constants/constants';
import { 
  schemaMunicipios,
  schemaSendFilesHistory,
  schemaEstablecimientos,
  schemaVisitas,
  triggerEstablecimientos,
  insertMunicipios
} from 'src/constants/schemas';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const conn = conexionBD()
    const { DB, SQLITE } = storeToRefs(conn)
    const db = DB.value
    db.open()
    const sqlite = SQLITE.value
    const visible = ref(false)
    const dark = ref(false)
    const dialogInfo = ref(false)
    const datos = ref(null)
    const $q = useQuasar()
    const router = useRouter()
    const auth = useAuthStore()
    const { token } = storeToRefs(auth)
    const userName = ref($q.localStorage.getItem('username'))
    const passWord = ref($q.localStorage.getItem('password'))
    const leftDrawerOpen = ref(false)
    let files = []

    onMounted(() => {
      //saveEstablecimientos()
      createDatabase()
    })
    const createDatabase = async () => {   
      visible.value = true
      let res

      try {
        //Crear base de datos
        res = await db.execute(schemaMunicipios)
        res = await db.execute(schemaSendFilesHistory)     
        res = await db.execute(schemaEstablecimientos)
        res = await db.execute(schemaVisitas)
        res = await db.execute(triggerEstablecimientos)
      } catch (error) {
        visible.value = false
        $q.dialog({
          title: 'Error',
          message: `No se pudo crear la base de datos. ${JSON.stringify(error)}`,
          ok: {
            label: 'Ok',
            color: 'negative'
          }
        })
      }
      //Crear tabla de sicronización
      await db.createSyncTable()
      await db.getTableList()      
      res = await getValues() // si retorna null entra en modo offline

      if (!res) {
        visible.value = false
        /* Verifica si existen datos en la tabla establecimientos con el 
        fin de asegurar que el sistema se encuentre sincronizado */
        const verify = await db.query('SELECT * FROM establecimientos;')
        verify.values.length == 0 ? $q.dialog({
          title: 'Error',
          message: 'No se han obtenido datos de establecimientos. Por favor, verifique la conexión a internet, salga e intentelo de nuevo.',
          ok: {
            label: 'Ok',
            color: 'negative'          
          }
        }) : null
        return null
      }
      const partialImport = {
        database : 'uesvalle',
        version: 2,
        encrypted : false,
        mode : 'partial',
        tables :[{
          name : 'establecimientos',
          values : res
        }]
      }
      await sqlite.importFromJson(JSON.stringify(partialImport))
      let query = await db.query('SELECT * FROM municipios')
      if (query.values.length == 0) {
        await db.execute(insertMunicipios).catch(err => {
          console.log('Error al insertar municipios: ', err)
        })
      }
      visible.value = false
    }

    const logout = () => {
      $q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro que desea cerrar sesión?',
        ok: {
          label: 'Si',
          color: 'positive'
        },
        cancel: {
          label: 'No',
          color: 'negative'
        }
      }).onOk(() => {
        token.value = null
        $q.cookies.remove('token')
        $q.localStorage.remove('username')
        $q.localStorage.remove('password')
        db.close()
        router.push({ name: 'login' })
      })
    }

    const  getEstablecimientos = async () => {
      if (!userName.value || !passWord.value) {
        router.push({ name: 'login' })     
      }
      let response = null
      try{     
        response = await api.post('http://192.168.1.95:8081/index.php?r=sistema/obtener-establecimientos',
          {
            usuario: userName.value,
            clave: passWord.value
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
      } catch (error) {
        return null
      }
      return response
    }

    const parseToImportFromJSON = (json) => {
      let result = []
      let i = 0

      for (const item of json) {
        result[i] = []
        result[i][0] = i+1
        result[i][1] = item.daneMunicipio
        result[i][2] = item.documentoEstablecimiento
        result[i][3] = item.nombreEstablecimiento
        result[i][4] = item.direccionEstablecimiento
        result[i][5] = parseInt(item.sql_deleted)
        result[i][6] = parseInt(item.last_modified)
        i++
      }
      return result
    }

    const getValues = async () => {
      const result = await getEstablecimientos()
      if (!result) {
        console.log('Modo offline')
        return null
      }
      const data = parseToImportFromJSON(result.data.establecimientos)
      return data
    }

    const upload = () => {
      $q.dialog({
        title: 'Enviar archivos',
        message: 'Esta seguro que desea enviar los archivos? una vez confirmado no se podrá detener el proceso',
        ok: {
          label: 'Ok',
          color: 'positive'
        },
        cancel: {
          label: 'Cancelar',
          color: 'negative'
        }
      }).onOk(async () => {
        $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'blue-grey-10',
        message: 'Subiendo archivos...',
        messageColor: 'white'
      })

      const data = []
      const formData = new FormData()

      const visitas = await db.query('SELECT id_form, json_data FROM visitas WHERE sql_deleted = 0')

      for (const item of visitas.values) {
        files.push(JSON.parse(item.json_data))
        const blob = new Blob([item.json_data],
          {
            type: 'application/json'
          })
        formData.append('Documentos_json[]', blob, item.id_form)
      }

      formData.append('usuario', userName.value)
      formData.append('clave', passWord.value)
      api.post('http://192.168.1.95:8081/index.php?r=sistema/cargar-entrevistas-realizadas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(async ({ data }) => {
          if (data.error) {
            $q.loading.hide()
            $q.dialog({
              title: '!Ups, algo salio mal!',
              message: data.mensaje,
              ok: {
                label: 'ok',
                color: 'positive'
              }
            })
            return
          }
          datos.value = data
          let response = ''
          const fecha = generateDate()
         
          for(const item of files){
            await db.execute(`INSERT INTO send_files_history (id_file, id_user_file, id_user_send, json_data, date) VALUES ('${item.id}',${item.usuarioEntrevistador},${userName.value},'${JSON.stringify(item)}','${fecha}')`)
          }
          await db.execute('DELETE FROM visitas')
          $q.loading.hide()
          router.push({ name: 'index' })
          dialogInfo.value = true
          //data.nom_exitosos ?? []
          //data.nom_fallidos ?? []

          /*for (const item of data.nom_exitosos ? data.nom_exitosos : []) {
            response += `Archivo ${item} fue subido con éxito`
            response += '</b>'
            response += '<br>'
          }

          for (const item of data.nom_fallidos ? data.nom_fallidos : []) {
            response += '<b style="color: red">'
            response += `Error al intentar guardar el archivo ${item}`
            response += '</b>'
            response += '<br>'
          }
          response += `Total enviados: ${data.enviados}<br>`
          response += `Archivos guardados: ${data.almacenados}<br>`
          response += `Archivos no guardados: ${data.no_almacenados}`

          $q.dialog({
            title: 'Resumen',
            message: response,
            persistent: true,
            html: true
          })*/
        }).catch((error) => {
          $q.loading.hide()

          $q.dialog({
            title: '!Ups, algo salio mal!',
            message: `Por favor revisa tu conexión a internet: ${error}`,
            persistent: true
          })
        })
      }) 
    }

    return {
      token,
      userName,
      passWord,
      files,
      visible,
      dark,
      datos,
      dialogInfo,
      logout,
      upload,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      getEstablecimientos
    }
  }
});
</script>
