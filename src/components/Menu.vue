<template>
  <q-list>
    <q-item-label header>
      Menú
    </q-item-label>
    <k-menu-item v-for="(item, index) in menu" :key="index" :node="item" />
  </q-list>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { menu } from './Menu'
import MenuItemComponent from 'src/components/MenuItem.vue'

export default defineComponent({
  name: 'MenuComponent',
  components: {
    kMenuItem: MenuItemComponent
  },
  props: {
    tree: {
      type: Array,
      required: false
    }
  },
  setup() {
    return {
      menu,
    }
  }
})
</script>