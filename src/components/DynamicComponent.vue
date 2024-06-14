<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import { defineComponent, computed, shallowRef } from 'vue'
// import { DynamicComponents } from 'src/constants/Interfaces'
// import { FormEnvironment } from 'src/modules/FormEnvironment'

type moduleColletion = { default: any[] }

export default defineComponent({
  name: 'DynamicComponent',
  props: {
    componentName: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  components: {
    //...(function () {
    /* Se importa de forma dinámica los componentes, como lo son los formularios,
    con el fin de no tener que importarlos en paginas .vue diferentes */
    // const components = {
    //FAMA08: defineAsyncComponent(() => import('pages/formats/F-AM-A-08/FormElement.vue')),
    //FAMA08: defineAsyncComponent(() => import('pages/formats/F-AM-A-08/FormsCollection.ts')),
    // MyComponent2: defineAsyncComponent(() => import('pages/formats/F-AM-A-08/FormElement.vue')),
    // Agrega aquí todos los componentes que deseas utilizar dinámicamente
    // }
    // return components
    //})()
  },
  setup(props) {
    /* Esta funcion solamente se encarga de retornar el componente dinamico, Vue
    internamente hara match entre el nombre que hay en props.componentName y el
    nombre de alguna de las propiedades definidas en props.components.
    Luego :is se encargara de mostrar el componente importado */
    // const currentComponent = computed(() => {
    //return props.componentName;
    // });
    const groupModules: { [key: string]: () => Promise<moduleColletion> } = {
      FAMA02: () => import('pages/formats/F-AM-A-02/FormsCollection.ts'),
      FAMA08: () => import('pages/formats/F-AM-A-08/FormsCollection.ts')
    }
    const components = shallowRef<any>(null);

    const loadComponents = async () => {
      // Importa dinámicamente los componentes desde FormsCollection.ts
      const modules = await groupModules[props.componentName]();
      const module = modules.default
      components.value = module[props.index]
    }

    // Llama a la función para cargar los componentes
    loadComponents();

    // Lógica para seleccionar el componente actual
    const currentComponent = computed(() => {
      return components.value || null;
    });

    return {
      // components,
      currentComponent
    };
  }
});
</script>
