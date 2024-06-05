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
  <q-item v-else :to="node?.to ?? null" @click="node.onClick ? handleClick.onAction(node?.id) : null"
    active-class="tab-active" exact class="navigation-item" :clickable="!!node?.to || !!node?.onClick" v-ripple>
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
import { FormInitComponent } from 'src/components/formComponentLoad/Mediator'
import { Director } from 'src/components/formComponentLoad/Director'
import { HandleRoutes } from 'src/components/formComponentLoad/Components'

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
    const hasChildren = computed(() => {
      const isChildren = !!props.node?.children
      console.log(isChildren)
      let result = false
      if (isChildren) {
        result = props.node.children.length > 0
      }
      return result
    })
    const handleClick = new HandleRoutes()
    const director = new Director()
    const formInit = new FormInitComponent(handleClick)
    formInit.setDirector(director)
    /* const handleClick = (link) => {
      console.log('estoy haciendo click ', link)
      return true
    } */
    return {
      handleClick,
      director,
      formInit,
      hasChildren
    }
  }
})
</script>