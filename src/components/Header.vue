<template>
  <q-card class="q-mb-lg">
    <q-card-section :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-4 text-black'">
      <div class="text-center">
        <b>{{ title }}</b>
      </div>
    </q-card-section>
    <q-card-section class="text-center">
      {{ content }}
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
})
</script>