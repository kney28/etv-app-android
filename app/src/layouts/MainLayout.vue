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

          <q-expansion-item :header-inset-level="0.2" :content-inset-level="0.5" expand-separator>
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
          </q-expansion-item>
        </q-expansion-item>

        <q-separator></q-separator>

        <q-item @click="setTabSelected('/profiles', 'Perfiles')" active-class="tab-active" to="/profiles" exact
          class="q-ma-sm navigation-item" clickable v-ripple>
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const auth = useAuthStore()
    const { token } = storeToRefs(auth)
    const leftDrawerOpen = ref(false)

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

    const setTabSelected = (url: any, name: any) => { return url + name }

    return {
      logout,
      setTabSelected,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
