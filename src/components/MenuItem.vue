<template>
  <!--Contenedores o ramas-->
  <q-expansion-item v-if="hasChildren" :header-inset-level="headerInsetLevel" :content-inset-level="contentInsetLevel"
    expand-separator>
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon :name="node?.iconName || 'fa-regular fa-pen-to-square'" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        {{ node.label }}
      </q-item-section>
    </template>
    <MenuItemComponent v-for="(child, index) in node.children" :key="index" :node="child" />
  </q-expansion-item>
  <!--Hojas-->
  <q-item v-else :to="node?.to ?? null" @click="node.onClick ? onAction(node?.id) : null" active-class="tab-active"
    exact class="navigation-item" :clickable="!!node?.to || !!node?.onClick" v-ripple>
    <q-item-section avatar>
      <q-icon :color="node?.iconColor || 'orange'" :name="node?.iconName || 'fa-regular fa-pen-to-square'" />
    </q-item-section>

    <q-item-section>
      {{ node.label }}
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useMediator } from 'src/stores/mediator'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MenuItemComponent',
  props: {
    node: {
      type: Object,
      required: true
    },
    headerInsetLevel: {
      type: Number,
      required: false,
      default: 0
    },
    contentInsetLevel: {
      type: Number,
      required: false,
      default: 0.2
    }
  },
  setup(props) {
    const { menuHandler, buttonHandler } = useMediator()
    const $q = useQuasar()
    const hasChildren = computed(() => {
      const isChildren = !!props.node?.children
      console.log(isChildren)
      let result = false
      if (isChildren) {
        result = props.node.children.length > 0
      }
      return result
    })
    const onAction = (sender) => {
      console.log('estoy haciendo click ', sender)
      switch (sender) {
        case 'Upload':
          $q.dialog({
            title: 'Confirmación',
            message: 'Se enviarán las visitas al servidor. ¿Desea continuar?',
            cancel: true,
            persistent: true,
            ok: {
              label: 'Ok',
              color: 'primary'
            }
          }).onOk(() => {
            buttonHandler.onAction('Upload')
          })
          break
        default:
          menuHandler.onAction(sender)
          break
      }
    }
    return {
      menuHandler,
      hasChildren,
      onAction
    }
  }
})
</script>
