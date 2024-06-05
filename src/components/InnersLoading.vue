<template>
  <q-inner-loading v-if="type === Inners.Facebook" :showing="visible" class="z-max">
    <q-spinner-facebook color="primary" size="140px" />
    <div style="font-size: 10px;">{{ label }}</div>
  </q-inner-loading>

  <q-inner-loading v-if="type === Inners.Puff" :showing="visible" class="z-max">
    <q-spinner-puff color="info" size="100px" />
  </q-inner-loading>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useInners, Inners } from 'src/stores/global'

export default defineComponent({
  name: 'InnersLoadingComponent',
  setup() {
    const { visible, type, label } = useInners()
    return {
      Inners,
      visible,
      type,
      label
    }
  }
})
</script>