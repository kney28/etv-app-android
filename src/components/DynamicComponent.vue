<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue'
import { DynamicComponents } from 'src/constants/Interfaces'

export default defineComponent({
  name: 'DynamicComponent',
  props: {
    componentName: {
      type: String,
      required: true
    }
  },
  components: {
    ...(function () {
      /* Se importa de forma dinámica los componentes, como lo son los formularios,
      con el fin de no tener que importarlos en paginas .vue diferentes */
      const components: DynamicComponents = {
        FormPrueba: defineAsyncComponent(() => import('pages/etv/FormPrueba.vue')),
        MyComponent2: defineAsyncComponent(() => import('pages/etv/FormPrueba2.vue')),
        // Agrega aquí todos los componentes que deseas utilizar dinámicamente
      }
      return components
    })()
  },
  setup(props) {
    /* Esta funcion solamente se encarga de retornar el componente dinamico, Vue
    internamente hara match entre el nombre que hay en props.componentName y el
    nombre de alguna de las propiedades definidas en props.components.
    Luego :is se encargara de mostrar el componente importado */
    const currentComponent = computed(() => {
      return props.componentName;
    });

    return {
      currentComponent
    };
  }
});
</script>