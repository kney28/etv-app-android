<script>
// import ButtonCounter from '../paginas-externas/PruebaPage.vue'
import { defineAsyncComponent } from 'vue'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

const ruta = async () => {
    try {
    const route = await Filesystem.getUri({
    path: 'PruebaPage.vue',
    directory: Directory.Data
    });

    console.log('ruta:', route.uri);
    } catch (error) {
    console.error('error:', error)
    }

    const a = defineAsyncComponent(() => import(route.uri))
    console.log(a)
    return a
}
// const ruta = '../paginas-externas/PruebaPage.vue'

export default {
  components: {
    ButtonCounter: ruta()
  }
}
</script>

<template>
	<h1>Here are many child components!</h1>
	<ButtonCounter />
	<ButtonCounter />
	<ButtonCounter />
</template>