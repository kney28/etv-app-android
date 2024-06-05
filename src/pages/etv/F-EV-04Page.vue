<template>
  <q-page class="q-pa-md">
    <k-principal-view>
      <template v-slot:content>
        <q-card-section>
          <k-dynamic-component :componentName="dynamicComponent" @action="action" />
        </q-card-section>
      </template>
    </k-principal-view>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import PrincipalViewComponent from 'src/components/PrincipalView.vue'
import DynamicComponent from 'src/components/DynamicComponent.vue'
import { usePrincipal } from 'stores/principal'

export default defineComponent({
  name: 'F-EV-04Page',
  components: {
    kPrincipalView: PrincipalViewComponent,
    kDynamicComponent: DynamicComponent
  },
  setup() {
    const action = (e) => {
      switch (e.type) {
        case 'hiddenDialog':
          // activado.value = false
          break;
        default:
          break;
      }
    }
    const { dynamicComponent } = usePrincipal()
    console.log(dynamicComponent)
    return {
      action,
      dynamicComponent
    }
  }
})
</script>
