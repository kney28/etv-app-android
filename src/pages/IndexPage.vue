<template>
  <div class="text-h6 col-md-12 text-center q-pa-md">Dashboard</div>

  <div class="q-pa-md">
    <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated control-color="white"
      navigation padding arrows height="300px" class="bg-deep-purple text-white shadow-1 rounded-borders">
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="lg" icon="fa-regular fa-eye" color="yellow" flat round dense @click="onClick" />
        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
      </template>

      <q-carousel-slide name="check" class="column no-wrap flex-center">
        <q-icon name="fa-solid fa-list-check" size="56px" />
        <div class="q-mt-md text-center">
          Encuestas realizadas: 5
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="upload" class="column no-wrap flex-center">
        <q-icon name="fa-solid fa-upload" size="56px" />
        <div class="q-mt-md text-center">
          Archivos pendientes por sincronizar: 2
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      slide: ref('check'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
})
</script>