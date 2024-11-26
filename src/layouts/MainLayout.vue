<template>
  <k-inner-loading />
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>UESVALLE<br>
          <div style="font-size: 10px">
            {{ mode }}<br>{{ state }}
          </div>
        </q-toolbar-title>

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

import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { conexionBD } from 'src/stores/conexionBD'
import { storeToRefs } from 'pinia'
import { useMediator } from 'src/stores/mediator'
import { useStatusNetwork } from 'src/stores/global'

export default defineComponent({
  name: 'MainLayout',
  components: {
    kMenu: MenuComponent,
    kTransactionReport: TransactionReportComponent,
    kDialog: DialogComponent,
    kInnerLoading: InnersLoadingComponent
  },
  setup() {
    const { initialSetup, buttonHandler } = useMediator()
    const { state } = storeToRefs(useStatusNetwork())
    const { appContext } = getCurrentInstance()
    const mode = appContext.config.globalProperties.$mode
    const router = useRouter()
    const conn = conexionBD()
    const { DB } = storeToRefs(conn)
    const db = DB.value
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

    onMounted(() => {
      initialSetup.onAction('InitialSetup')
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
        $q.localStorage.remove('username')
        $q.localStorage.remove('password')
        db.close()
        router.push({ name: 'login' })
      })
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
      }).onOk(() => {
        buttonHandler.onAction('Upload', { username: userName, password: passWord })
      })
    }

    return {
      mode,
      state,
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
    }
  }
});
</script>
