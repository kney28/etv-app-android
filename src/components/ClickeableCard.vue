<template>
  <div class="col-xs-4 col-sm-3 col-md-3">
    <q-card class="clickable-card" @click="action">
      <q-card-section class="text-center">
        {{ label }}
      </q-card-section>
      <q-card-actions align="right">
        <q-icon :color="iconColor" :name="iconName" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClickeableCardComponent',
  props: {
    cardKey: {
      type: Number,
      required: false,
      default: 1
    },
    label: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: false,
      default: 'green'
    },
    iconName: {
      type: String,
      required: false,
      default: 'fa-solid fa-check'
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    const action = (event: MouseEvent): void => {
      const target = event.target as HTMLElement
      target.parentElement?.classList.add('ripple')

      setTimeout(() => {
        target.parentElement?.classList.remove('ripple')
      }, 300);
      emit('action', props.cardKey)
      console.log(props.cardKey)
    }

    return {
      action
    }
  }
})
</script>

<style>
.clickable-card {
  position: relative;
  overflow: hidden;
}

.clickable-card::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}

.clickable-card.ripple::after {
  width: 200%;
  height: 200%;
  opacity: 1;
}
</style>
