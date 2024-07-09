<template>
  <q-inner-loading v-if="inners.type === Inners.Facebook" :showing="inners.visible" class="z-max">
    <q-spinner-facebook color="primary" size="140px" />
    <div style="font-size: 10px;">{{ inners.label }}</div>
  </q-inner-loading>

  <q-inner-loading v-if="inners.type === Inners.Puff" :showing="inners.visible" class="z-max">
    <q-spinner-puff color="info" size="100px" />
  </q-inner-loading>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useInners, Inners } from 'src/stores/global'

export default defineComponent({
  name: 'InnersLoadingComponent',
  setup() {
    const inners = useInners()
    return {
      Inners,
      inners
    }
  }
})
</script>
