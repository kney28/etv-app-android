<template>
  <q-page class="q-pa-md">
    <k-principal-view @action="action">
      <template v-slot:content>
        <q-card-section>
          <k-dynamic-component :componentName="dynamicComponent" :index="idNode" @action="action" />
        </q-card-section>
      </template>
    </k-principal-view>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import PrincipalViewComponent from 'src/components/PrincipalView.vue'
import DynamicComponent from 'src/components/DynamicComponent.vue'
import { usePrincipal } from 'stores/principal'
import { useMediator } from 'src/stores/mediator'

export default defineComponent({
  name: 'F-EV-04Page',
  components: {
    kPrincipalView: PrincipalViewComponent,
    kDynamicComponent: DynamicComponent
  },
  setup() {
    const idNode = ref(0)
    const { filterHandler } = useMediator()
    const action = (e) => {
      switch (e.type) {
        case 'selectNode':
          idNode.value = e.data
          break
        case 'Municipality':
          console.log('filterMunicipios')
          filterHandler!.onAction('Municipality', e.data)
        default:
          break
      }
    }
    const { dynamicComponent } = usePrincipal()
    console.log(dynamicComponent)
    return {
      filterHandler,
      idNode,
      action,
      dynamicComponent
    }
  }
})
</script>
