<template>
  <k-inner-loading />
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>UESVALLE</q-toolbar-title>

        <q-fab color="blue-grey-2" text-color="blue-grey-8" icon="fa-solid fa-gear" padding="xs" direction="down">
          <q-fab-action external-label label-position="left" label="Salir" color="cyan" @click="logout"
            icon="fa-solid fa-sign-out-alt" />
          <q-fab-action external-label label-position="left" label="Configuración" to="/config/Config"
            color="deep-purple" icon="fa-solid fa-user-gear" />
        </q-fab>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <k-menu></k-menu>
      <br>
      <div class="col-lg-12 col-md-12 col-xs-12 text-left">
        <q-toggle v-model="dark" checked-icon="fa-solid fa-moon" color="blue-grey" unchecked-icon="fa-solid fa-sun"
          size="lg" label="Modo oscuro" @update:model-value="(val) => $q.dark.set(val)" />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <k-dialog :visible="false" type="ok" :banner="false">
      <template v-slot:body>
        <k-transaction-report />
      </template>
    </k-dialog>
  </q-layout>
</template>

<script>
import MenuComponent from 'src/components/Menu.vue'
import TransactionReportComponent from './TransactionReport.vue'
import DialogComponent from 'src/components/Dialog.vue'
import InnersLoadingComponent from 'src/components/InnersLoading.vue'

import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { conexionBD } from 'src/stores/conexionBD';
import { useInners, Inners } from 'src/stores/global'
import { storeToRefs } from 'pinia';
import { api, MODE } from 'src/boot/axios';
import { generateDate } from 'src/constants/constants';
import {
  schemaMunicipios,
  schemaSendFilesHistory,
  schemaEstablecimientos,
  schemaVisitas,
  triggerEstablecimientos,
  insertMunicipios,
  insertEstablecimientos,
  resetEstablecimientos
} from 'src/constants/schemas';

export default defineComponent({
  name: 'MainLayout',
  components: {
    kMenu: MenuComponent,
    kTransactionReport: TransactionReportComponent,
    kDialog: DialogComponent,
    kInnerLoading: InnersLoadingComponent
  },
  setup() {
    const { appContext } = getCurrentInstance()
    const mode = appContext.config.globalProperties.$mode
    const router = useRouter()
    const conn = conexionBD()
    const { DB, SQLITE } = storeToRefs(conn)
    const db = DB.value
    db.open()
    const sqlite = SQLITE.value
    const inner = useInners()
    inner.type = Inners.Facebook
    inner.label = 'Preparando el entorno...'
    const visible = ref(false)
    const dark = ref(false)
    const dialogInfo = ref(true)
    const datos = ref(null)
    const $q = useQuasar()
    const auth = useAuthStore()
    const { token } = storeToRefs(auth)
    const userName = ref($q.localStorage.getItem('username'))
    const passWord = ref($q.localStorage.getItem('password'))
    const leftDrawerOpen = ref(false)
    let files = []
    const urlDown = 'http://192.168.1.95:8081/index.php?r=sistema/obtener-establecimientos'
    const urlUp = 'http://192.168.1.95:8081/index.php?r=sistema/cargar-entrevistas-realizadas'

    onMounted(() => {
      createDatabase()
    })
    const createDatabase = async () => {
      inner.visible = true
      let res

      try {
        //Crear base de datos
        res = await db.execute(schemaMunicipios)
        res = await db.execute(schemaSendFilesHistory)
        res = await db.execute(schemaEstablecimientos)
        res = await db.execute(schemaVisitas)
        res = await db.execute(triggerEstablecimientos)
      } catch (error) {
        inner.visible = false
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
      // await db.getTableList()
      // res = await getValues() // si retorna null entra en modo offline
      res = null
      if (!res) {
        inner.visible = false
      /* Verifica si existen datos en la tabla establecimientos con el
      fin de asegurar que el sistema se encuentre sincronizado */
      /* const verify = await db.query('SELECT * FROM establecimientos LIMIT 3;')
      verify.values.length == 0 ? $q.dialog({
        title: 'Error',
        message: 'No se han obtenido datos de establecimientos. Por favor, verifique la conexión a internet, salga e intentelo de nuevo.',
        ok: {
          label: 'Ok',
          color: 'negative'
        }
      }) : null
      return null
    */ }
      /* const partialImport = {
        database : 'uesvalle',
        version: 2,
        encrypted : false,
        mode : 'partial',
        tables :[{
          name : 'establecimientos',
          values : res
        }]
      }
      await sqlite.importFromJson(JSON.stringify(partialImport))*/
      let query = await db.query('SELECT * FROM municipios')
      if (query.values.length == 0) {
        await db.execute(insertMunicipios).catch(err => {
          console.log('Error al insertar municipios: ', err)
        })
      }
      if (mode === MODE.DEVELOPMENT) {
        /* cons esto se resetea la tabla establecimientos y la secuencia
        await db.execute(resetEstablecimientos[0]).catch(err => {
          console.log('Error al resetear establecimientos: ', err)
        })
        await db.execute(resetEstablecimientos[1]).catch(err => {
          console.log('Error al resetear la secuencia: ', err)
        }) */
        const query = await db.query('SELECT * FROM establecimientos LIMIT 3')
        if (query.values.length === 0) {
          await db.execute(insertEstablecimientos).catch(err => {
            console.log('Error al insertar establecimientos: ', err)
          })
          await db.query('SELECT * FROM establecimientos LIMIT 3')
        }
      }
      db.close()
      inner.visible = false
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

    const getEstablecimientos = async () => {
      if (!userName.value || !passWord.value) {
        router.push({ name: 'login' })
      }
      let response = null
      try {
        response = await api.post(urlDown,
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
        result[i][0] = i + 1
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
      if (!result || !result.data.error) {
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
        api.post(urlUp, formData, {
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

            for (const item of files) {
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
