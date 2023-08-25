<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>UESVALLE</q-toolbar-title>

        <q-btn flat round dense icon="fas fa-sign-out-alt" @click="logout" />
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

            <q-item @click="setTabSelected('/etv/encuestalarvaria', 'Enfermedades transmitidas por vectores')"
              active-class="tab-active" to="/etv/FV-EV-04" exact class="q-ma-sm navigation-item" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="black" name="fa-solid fa-marker" />
              </q-item-section>

              <q-item-section>
                Formulario FV-EV-04
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <!--<q-expansion-item :header-inset-level="0.2" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="fa-solid fa-cat" color="primary" text-color="white" />
              </q-item-section>
  
              <q-item-section>
                Zoonosis
              </q-item-section>
            </template>

            <q-item @click="setTabSelected('/encuestalarvaria/encuestalarvaria', 'Encuesta larvaria')"
              active-class="tab-active" to="/encuestalarvaria" exact class="q-ma-sm navigation-item" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="black" name="fa-solid fa-marker" />
              </q-item-section>

              <q-item-section>
                Encuesta larvaria
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item :header-inset-level="0.2" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="fa-solid fa-glass-water-droplet" color="primary" text-color="white" />
              </q-item-section>
  
              <q-item-section>
                Agua para consumo humano
              </q-item-section>
            </template>

            <q-item @click="setTabSelected('/encuestalarvaria/encuestalarvaria', 'Encuesta larvaria')"
              active-class="tab-active" to="/encuestalarvaria" exact class="q-ma-sm navigation-item" clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="black" name="fa-solid fa-marker" />
              </q-item-section>

              <q-item-section>
                Encuesta larvaria
              </q-item-section>
            </q-item>
          </q-expansion-item>-->
        </q-expansion-item>

        <q-separator></q-separator>

        <q-item @click="upload()" active-class="tab-active" exact class="q-ma-sm navigation-item" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fa-solid fa-cloud-arrow-up" />
          </q-item-section>

          <q-item-section>
            Actualizar
          </q-item-section>
        </q-item>

        <q-item @click="setTabSelected('/profiles', 'Perfiles')" active-class="tab-active" to="/profiles" exact
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
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
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
import { storeToRefs } from 'pinia';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { api } from 'src/boot/axios';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const dark = ref(false)
    const dialogInfo = ref(false)
    const datos = ref(null)
    const $q = useQuasar()
    const router = useRouter()
    const auth = useAuthStore()
    const { token, userName, passWord } = storeToRefs(auth)
    const leftDrawerOpen = ref(false)
    const dir = 'visitas/ETV'

    onMounted(() => {
      saveEstablecimientos()
    })

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
        router.push({ name: 'login' })
      })
    }

    const  getEstablecimientos = async () => {
      let response = null
      try{     
        response = await api.post('http://192.168.1.95:8081/index.php?r=sistema/obtener-establecimientos',
          {
            usuario: 'kevin',
            clave: 'kevin'
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
      } catch (error) {
        console.log(error)
        return null
      }
      console.log(response.data)
      return response
    }

    const readFile = async (path) => {
      let result = null
      try{
        result = await Filesystem.readFile({
          path: path,
          directory: Directory.Data,
          encoding: Encoding.UTF8
        })
      } catch (error) {
        console.log(error)
        return null
      }
      // const obj = JSON.parse(result.data)
      console.log(result.data)
      return result.data
    }

    const saveFile = async (path, data) => {
      console.log(data)
      await Filesystem.writeFile({
        path: path,
        data: data,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })
    }

    const saveEstablecimientos = async () => {
      const exist = await readFile('establecimientos/establecimientos.json')
      if (exist) {
        console.log('existe')
        $q.loading.hide()
        return
      } else {
        $q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'yellow',
          spinnerSize: 140,
          backgroundColor: 'blue-grey-10',
          message: 'Actualizando listado de establecimientos...',
          messageColor: 'white'
        })
        const establecimientos = await getEstablecimientos()
        if(!establecimientos || establecimientos.data.hasOwnProperty( 'error')){
          $q.loading.hide()
          const mensaje = !establecimientos ? '' : establecimientos.data.hasOwnProperty( 'error') ? establecimientos.data.mensaje : ''
          $q.dialog({
            title: 'Ups! algo salio mal',
            message: 'Error al obtener los establecimientos, revise su conexión a internet e intente nuevamente: ' + mensaje,
            ok: {
              label: 'ok',
              color: 'positive'
            }
          })
        } else {
          saveFile('establecimientos/establecimientos.json', JSON.stringify(establecimientos.data))
          $q.loading.hide()
          $q.dialog({
            title: '¡Exito!',
            message: 'El listado de establecimientos fue actualizado exitosamente',
            ok: {
              label: 'ok',
              color: 'positive'
            }
          })
        }
      }
    }

    const setTabSelected = (url, name) => { return url + name }

    const upload = async () => {
      //visible.value = true
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'blue-grey-10',
        message: 'Subiendo archivos...',
        messageColor: 'white'
      })
      const result = await Filesystem.readdir({
        path: dir,
        directory: Directory.Data
      })
      const data = []
      const formData = new FormData()
      //formData.append("nombre", "kevin")
      //console.log(formData)

      for (const item of result.files) {
        const temp = await readFile(`${dir}/${item.name}`)
        // temp.formato = item.name
        data.push(temp)
        const blob = new Blob([temp],
          {
            type: 'application/json'
          })
        formData.append('file[]', blob, item.name)
      }

      for (var entrie of formData.entries()) {
        console.log(entrie[0] + ': ' + entrie[1]);
      }

      for (const value of formData.values()) {
        console.log(value);
      }

      formData.append('user', userName.value)
      formData.append('pass', passWord.value)
      api.post('https://uesapi.000webhostapp.com/upload/graphql/apiPost.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({ data }) => {
          console.log(data)
          datos.value = data
          dialogInfo.value = true
          //visible.value = false
          $q.loading.hide()
          let response = ''
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
          console.log(error)
          $q.loading.hide()

          $q.dialog({
            title: '!Ups, algo salio mal!',
            message: `Por favor revisa tu conexión a internet: ${error}`,
            persistent: true
          })
        })

      // 
    }

    return {
      dark,
      datos,
      dialogInfo,
      logout,
      setTabSelected,
      upload,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      getEstablecimientos,
      readFile
    }
  }
});
</script>
