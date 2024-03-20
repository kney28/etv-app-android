# Bienvenidos

En esta sección le mostraré como poner en marcha este asunto.

> **Nota:** Se asume que tienes instalado y configurado el Android Studio

## Primero lo primero

Deben saber que esta app esta desarrollada con Vue 3 y Quasar, y que capacitor.js lo usamos para que empaquete nuestro código en una aplicación nativa y esta pueda funcionar en nuestro Android Studio o Android OS.

Con esto en mente, continuemos.

# QuasarApp

Vamos a instalar Quasar y sus dependencias.
Nos ubicamos en el directorio `app` y ejecutamos el siguiente comando

## Install the dependencies Quasar

```bash
npm install
```
# Capacitor

Luego debemos acceder al directorio `src-capacitor` y ejecutar.

## Install the dependencies Capacitor

```bash
npm install
```

# Configuración

Vamos a editar el archivo `quasar.config.js` que esta en la raiz del proyecto y modificaremos la siguiente línea con el `path` de nuestro `studio.sh`.

```js
bin: {
      linuxAndroidStudio: '/home/myuser/android-studio/bin/studio.sh'
    }
```

# Ahora sí!

Bueno ahora solo lo que queda es poner a funcionar esto.
A continuación, te mostraré las opciones que tienes para poder ejecutar esta app.
primero ubícate en el directorio raíz `app`.

## Modo developing

```bash
quasar dev -m capacitor -T android
```

Este modo abrirá Android Studio y deberás crear un emulador para poder ejecutarla, no es complicado.

## Modo Building

```bash
quasar build -m capacitor -T android
```

Este modo creará un paquete en `/dist/capacitor`.
Si presentas problemas con este modo te recomiendo ir al siguiente.


## Modo Building usando Android Studio

```bash
quasar build -m capacitor -T android --ide
```

Esto abrirá Android Studio y lo único que tendrás que hacer será dirigirte al menú `Build\Build Bundle(s) / APK(s)\Build APK(s)` y hacer clic.
Esto generará un .apk que podrás instalar en tu Android y así podrás probar esta vuelta.

