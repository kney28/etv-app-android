<template>
  <q-card-section>
    <q-markup-table>
      <thead>
        <tr v-if="headerLabel">
          <th colspan="2" class="text-center bg-black text-yellow-7">{{ headerLabel }}</th>
        </tr>
        <tr>
          <th v-for="(col, index) in colsNames" :key="index" class="text-left">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(col, index) in colsData" :key="index">
          <td>{{ col.label }}</td>
          <td v-if="col.status === 'success'" class="text-center">
            <q-avatar text-color="white" size="xs" round color="green" icon="fa-solid fa-check"></q-avatar>
          </td>
          <td v-else class="text-center">
            <q-avatar text-color="white" size="xs" round color="red" icon="fa-solid fa-xmark"></q-avatar>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-card-section>
  <q-card-section>
    <div class="row shadow-2 q-pa-sm">
      <div class="col-lg-12 col-md-12 col-xs-12">

        Archivos enviados: {{ sendData }}
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12">
        Archivos almacenados: {{ storedData }}
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12">
        Archivos no almacenados: {{ noStoredData }}
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 q-pt-md" style="font-size: 10px; font-style: italic;">
        Se ha realizado un registro (log) de los detalles de la transmisión de datos,
        incluyendo la información de los archivos enviados
      </div>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TransactionReportComponent',
  props: {
    headerLabel: {
      type: String,
      required: false,
      default: ''
    },
    colsNames: {
      type: Object,
      required: true,
      default: () => ({})
    },
    colsData: {
      type: Object,
      required: true,
      default: () => ({})
    },
    sendData: {
      type: String,
      required: true,
      default: '0'
    },
    storedData: {
      type: String,
      required: true,
      default: '0'
    },
    noStoredData: {
      type: String,
      required: true,
      default: '0'
    }
  }
})
</script>