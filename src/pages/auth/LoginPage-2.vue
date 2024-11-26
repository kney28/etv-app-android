<style>
@font-face {
  font-family: quicksand;
  src: url(../../fonts/Poppins/Quicksand.ttf);
}

@font-face {
  font-family: poppins-bold;
  src: url(../../fonts/Poppins/Poppins-Bold.ttf);
}

@font-face {
  font-family: poppins-regular;
  src: url(../../fonts/Poppins/Poppins-Regular.ttf);
}

.font-poppins-regular {
  font-family: 'poppins-regular';
}

.font-poppins-bold {
  font-family: 'poppins-bold';
}

/*Prevent the web browser styles*/
.input-login:-webkit-autofill,
.input-login:-webkit-autofill:hover,
.input-login:-webkit-autofill:focus {
  -webkit-text-fill-color: #31b0dd;
  -webkit-box-shadow: 0 0 0px 40rem #ffff inset;
}

.input-login {
  height: 25px;
}

.fondo {
  background-image: url('../../images/fondo.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 30vh;
  position: relative;
  z-index: -1;
}

.mrtop {
  margin-top: -60px;
  border-radius: 40px;
  width: 90%;
  margin-left: 5%;
}

.bg-white {
  background-color: rgba(255, 255, 255, 1);
}

.dark {
  background-color: #121212;
}
</style>
<template>
  <div class="fondo"></div>
  <div class="row items-start q-col-gutter-sm fit wrap justify-center content-center">
    <div :class="$q.dark.isActive ? 'col-12 col-md-4' : 'col-12 col-md-4'" style="min-width: 300px;">
      <div>
        <q-card-section class="content-center justify-center">
          <div :class="$q.dark.isActive ? 'dark mrtop q-pa-sm' : 'bg-white mrtop q-pa-sm'">
            <div class="text-center">
              <!--<q-icon name="fa-solid fa-stethoscope" size="70px" style="color: #12506A" class="q-mb-lg" />-->
            </div>
            <div>
              <p style="color: #12506A; font-size: 30px; font-weight: bolder;" class="text-center q-mb-sm">
                UESVALLE
              </p>
            </div>
            <div>
              <p style="color: #4794b6; font-size: 18px; font-weight: bolder;" class="text-center q-mb-lg">
                Enfermedades transmitidas por vectores
              </p>
            </div>
          </div>

          <div class="col text-h6 text-center font-poppins-bold q-pt-lg" style="color: #12506A; font-weight:bold">
            Iniciar sesión
          </div>
        </q-card-section>
        <q-card-section style="padding: 0 18% 0 18%;">
          <form class="q-form q-gutter-md">
            <div>
              <label class="font-poppins-regular" style="color: rgb(40,40,40)" for="">Usuario</label>
              <q-input v-model="username" placeholder="Ej. 1234567890" lazy-rules
                :rules="[val => !!val || 'Completa el campo', val => val.length >= 6 || 'Mínimo 6 caracteres']" rounded
                outlined :input-style="{ marginTop: '15px' }" :input-class="{ 'input-login': 'a' }"
                class="font-poppins-regular" mask="#" reverse-fill-mask @update:model-value="() => message = null" />
            </div>
            <div>
              <label class="font-poppins-regular" style="color: rgb(40,40,40)" for="">Constraseña</label>
              <q-input v-model="password" placeholder="Ingresa tu contraseña..." lazy-rules
                :rules="[val => !!val || 'Completa el campo']" rounded outlined :input-style="{ marginTop: '15px' }"
                :input-class="{ 'input-login': 'c' }" class="font-poppins-regular" :type="isPwd ? 'password' : 'text'"
                @update:model-value="() => message = null">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-xl">
              <q-btn label="Iniciar sesión" @click="login" lazy-rules rounded
                class="full-width font-poppins-bold q-mt-md" no-caps size="lg"
                style="background: linear-gradient(45deg, #20cbffa2, #073461e1); color: white;" />
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12 text-center text-red" style="font-size: 10px;">
              {{ message }}
            </div>
          </form>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { Encrypt } from 'src/components/Encrypt';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const $router = useRouter()
    const $q = useQuasar()
    const username = ref(null)
    const password = ref(null)
    const message = ref(null)
    const auth = useAuthStore()
    const { token } = storeToRefs(auth)

    const login = () => {
      $q.localStorage.set('username', username.value)
      $q.localStorage.set('password', password.value)
      const data = {
        username: username.value,
        password: new Encrypt(username.value).get(),
        access_token: 'success_x01'
      }
      console.log(data.password)
      if (data.password == password.value) {
        $q.cookies.set('token', data.access_token, {
          expires: '3h'
        })
        token.value = data.access_token
        message.value = null
        $router.push({ name: 'Index' })
      } else {
        console.log('Credenciales incorrectas')
        message.value = 'Credenciales incorrectas'
      }
      console.log($q.cookies.get('token'))
    }

    return {
      message,
      username,
      password,
      login,
      isPwd: ref(true),
    }
  }
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
