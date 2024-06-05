<template>
  <div class="row q-col-gutter-sm">
    <k-clickeable-card v-for="(item, index) in cardElements" :key="index" :cardKey="index" :label="item.label"
      :iconColor="item.iconColor" :iconName="item.iconName" @action="action" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClickeableCardComponent from 'src/components/ClickeableCard.vue'

export default defineComponent({
  name: 'GroupCardsComponent',
  components: {
    kClickeableCard: ClickeableCardComponent
  },
  props: {
    cardElements: {
      type: Array as () => Array<{ label: string, iconColor?: string, iconName?: string }>,
      required: true
    }
  },
  emits: ['action'],
  setup(props, { emit }) {
    const action = (cardKey: number) => {
      emitAction('showTree', cardKey)
    }
    const emitAction = (type: string, data: any) => {
      emit('action', { type, data })
    }
    return {
      action
    }
  }
})
</script>