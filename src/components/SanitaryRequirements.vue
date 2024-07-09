<template>
  <q-card>
    <q-card-section class="q-pa-xs" style="font-size: 12px">
      <slot name="content"></slot>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SanitaryRequirementsComponent'
})
</script>
