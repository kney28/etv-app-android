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
</style>
<template>
  <div class="row items-start q-col-gutter-sm fit wrap justify-center content-center">
    <!-- <div class="col-12 col-md-8" style="min-width: 300px;">
      <div>
        <q-img src="images/hospital.jpeg" style="position: relative; width: 100%; height: 100vh">
        <div class="fullscreen">
          <div class="absolute-center justify-center fixed-left">
            <div class="text-h4 text-weight-bolder">
              ¡Bienvenid@!
            </div>
            <div class="text-h5 q-mt-sm font-poppins-regular" style="text-shadow:3px 5px 6px #000;">
              Aquí encontraras todas las herramientas que necesitas para gestionar
              todos los aspectos administrativos de tu hospital
            </div>
          </div>
        </div>
        </q-img>
      </div>
    </div> -->
    <div class="col-12 col-md-4" style="min-width: 300px;">
      <div>
        <q-card-section>
          <div class="text-center">
            <!--<q-icon name="fa-solid fa-stethoscope" size="70px" style="color: #12506A" class="q-mb-lg" />-->
          </div>
          <div>
            <p style="color: #60818E; font-size: 20px; font-weight: bolder;" class="text-center q-mb-xs">
              Entidad
            </p>
            <p style="color: #12506A; font-size: 30px; font-weight: bolder;" class="text-center q-mb-lg">
              UESVALLE
            </p>
          </div>
          <div class="col text-h6 text-center font-poppins-bold" style="color: #12506A; font-weight:bold">
            Iniciar sesión
          </div>
        </q-card-section>
        <q-card-section style="padding: 0 18% 0 18%;">
          <form class="q-form q-gutter-md">
            <div>
              <label class="font-poppins-regular" style="color: rgb(40,40,40)" for="">Usuario</label>
              <q-input v-model="username" placeholder="Ej. will2023" lazy-rules
                :rules="[val => !!val || 'Completa el campo']" rounded outlined :input-style="{ marginTop: '15px' }"
                :input-class="{ 'input-login': 'a' }" class="font-poppins-regular" mask="#" reverse-fill-mask />
            </div>
            <div>
              <label class="font-poppins-regular" style="color: rgb(40,40,40)" for="">Constraseña</label>
              <q-input v-model="password" placeholder="Ingresa tu contraseña..." lazy-rules
                :rules="[val => !!val || 'Completa el campo']" rounded outlined :input-style="{ marginTop: '15px' }"
                :input-class="{ 'input-login': 'c' }" class="font-poppins-regular" :type="isPwd ? 'password' : 'text'">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <!--<div class="text-right font-poppins-bold q-mt-sm" style="color: #2fc1ff; font-size: 12px;">
              Recuperar contraseña
            </div>-->
            <div>
              <q-btn label="Iniciar sesión" @click="login" lazy-rules rounded class="full-width font-poppins-bold q-mt-md"
                no-caps size="lg" style="background: #2fc1ff; color: white;" />
            </div>
            <!--<div class="q-mt-lg">
              <p class="text-center font-poppins-regular q-mb-xs" style="font-size: 11px;">¿Necesitas usuario para
                ingresar?</p>
              <p class="text-center font-poppins-bold" style="color: #2fc1ff; font-size: 16px;">Solicitalo aquí</p>
            </div>-->
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

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const $router = useRouter()
    const $q = useQuasar()
    const username = ref(null)
    const password = ref(null)
    const auth = useAuthStore()
    const { token } = storeToRefs(auth)
    const utf8Chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?';

    function encodeBase64(text) {
      return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
    }

    function decodeBase64(base64) {
      return decodeURIComponent(Array.prototype.map.call(atob(base64), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }

    function encryptCedula(cedula, salt) {
      const encodedSalt = encodeBase64(salt);
      const encryptedCedula = [];

      for (let i = 0; i < cedula.length; i++) {
        const charCode = cedula.charCodeAt(i);
        const saltCharCode = encodedSalt.charCodeAt(i % encodedSalt.length);
        const encryptedCharCode = (charCode + saltCharCode + i) % utf8Chars.length;
        const encryptedChar = utf8Chars.charAt(encryptedCharCode);
        encryptedCedula.push(encryptedChar);
      }

      return encryptedCedula.join('');
    }

    function decryptCedula(encryptedCedula, salt) {
      const encodedSalt = encodeBase64(salt);
      const decryptedCedula = [];

      for (let i = 0; i < encryptedCedula.length; i++) {
        const encryptedChar = encryptedCedula.charAt(i);
        const encryptedCharCode = utf8Chars.indexOf(encryptedChar);
        const saltCharCode = encodedSalt.charCodeAt(i % encodedSalt.length);
        const charCode = (encryptedCharCode - saltCharCode - i + utf8Chars.length) % utf8Chars.length;
        const decryptedChar = String.fromCharCode(charCode);
        decryptedCedula.push(decryptedChar);
      }

      return decryptedCedula.join('');
    }

    // Ejemplo de uso
    /* 
      const salt = '10x104q';
      const encryptedCedula = encryptCedula('1113594', salt);
      console.log('Cedula encriptada:', encryptedCedula);
      const decryptedCedula = decryptCedula(encryptedCedula, salt);
      console.log('Cedula desencriptada:', decryptedCedula);
    */
    const salt = '10x104q'

    const login = () => {
      console.log(encryptCedula(username.value, salt))
      const data = {
        username: username.value,
        password: encryptCedula(username.value, salt),
        access_token: "success_x01"
      }
      if (data.password == password.value) {
        $q.cookies.set('token', data.access_token, {
          expires: '5m'
        })
        token.value = data.access_token
        $router.push({ name: 'index' })
      } else {
        console.log('password incorrecto')
      }
      console.log($q.cookies.get('token'))
    }



    return {
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
