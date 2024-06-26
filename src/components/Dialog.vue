<template>
  <q-dialog :model-value="visible" @update:model-value="show" persistent>
    <q-card :style="style">
      <div class="fijo">
        <q-linear-progress :value="progress" color="blue" />
      </div>

      <q-card-section v-if="banner" class="row items-center q-pa-none">
        <q-banner inline-actions :class="$q.dark.isActive ? '' : 'bg-grey-3'">
          <template v-slot:avatar>
            <q-icon name="warning" color="warning" />
          </template>
          Los campos marcados con (*) son obligatorios
          <template v-slot:action>
            <q-btn icon="close" @click="close" flat round dense v-close-popup />
          </template>
        </q-banner>
      </q-card-section>

      <!-- <q-card-section> -->
      <slot name="body"></slot>
      <!-- </q-card-section> -->

      <q-card-actions v-if="type === 'default'" align="right">
        <btn type="submit" permission="A" @action="submit()" />
        <!-- <btn type="cancel" permission="A" /> -->
      </q-card-actions>

      <q-card-actions class="fijo2"
        :style="$q.dark.isActive ? [{ backgroundColor: 'rgb(41, 41, 41)' }] : [{ backgroundColor: 'rgb(240,240,240)' }]"
        v-if="type === 'check'" align="right">
        <btn type="check" permission="A" @action="check()" />
      </q-card-actions>

      <!-- <div class="fijo" v-if="type === 'check'">
        <btn type="check" permission="A" @action="check()" />
      </div> -->

      <q-card-actions v-if="type === 'ok'" align="right" class="text-teal">
        <q-btn flat round dense v-close-popup label="Ok" />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import btn from 'src/components/Buttons.vue'

export default defineComponent({
  name: 'DialogComponent',
  components: {
    btn
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: true
    },
    style: {
      type: Object,
      required: false,
      default: () => ({
        width: '90vw',
        maxWidth: '90vw',
        minWidth: '90vw'
      })
    },
    progress: {
      type: Number,
      required: false,
      default: 10
    },
    type: {
      type: String,
      required: false,
      default: 'default'
    },
    useEmit: {
      type: Boolean,
      required: false,
      default: true
    },
    banner: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    const emitAction = (type, data) => {
      if (props.useEmit) {
        emit('action', { type, data })
      }
    }
    const close = () => {
      emitAction('close', null)
    }
    const submit = () => {
      emitAction('Save', null)
    }
    const check = () => {
      console.log('myFoo2')
      emitAction('check', null)
    }

    const show = (state) => {
      console.log('hiddenDialog', state)
      emitAction('hiddenDialog', state)
    }
    return {
      close,
      submit,
      check,
      show
    }
  }
})
</script>

<style>
.fijo {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.fijo2 {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 10px;
}
</style>
