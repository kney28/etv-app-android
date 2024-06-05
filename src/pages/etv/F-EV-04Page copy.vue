<template>
  <page class="q-pa-md q-gutter-sm">
    <k-header title="hola" content="Como vamos" />
    <k-group-cards :cardElements="datos" @action="action" />
    <k-dialog-tree :nodes="simple" :dialog="activado" @action="action" />
    <q-btn class="q-pa-lg" color="secondary" icon-right="check" label="change color" @click="() => activado = true" />
  </page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import HeaderComponent from 'src/components/Header.vue'
import GroupCardsComponent from 'src/components/GroupCards.vue'
import DialogTreeComponent from 'src/components/DialogTree.vue'

export default defineComponent({
  name: 'PrincipalViewComponent',
  components: {
    kHeader: HeaderComponent,
    kGroupCards: GroupCardsComponent,
    kDialogTree: DialogTreeComponent
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup() {
    const action = (e) => {
      switch (e.type) {
        case 'hiddenDialog':
          activado.value = false
          break;
        default:
          break;
      }
    }
    const activado = ref(false)
    const datos = ref([
      {
        label: 'Sección 1',
        iconColor: 'green',
        iconName: 'fa-solid fa-house'
      },
      {
        label: 'Sección 2',
        iconColor: 'red',
        iconName: 'fa-solid fa-check'
      },
      {
        label: 'Sección 3',
        iconColor: 'blue',
        iconName: 'fa-solid fa-check'
      },
      {
        label: 'Sección 4',
        iconColor: 'yellow',
        iconName: 'fa-solid fa-check'
      }
    ])

    return {
      action,
      datos,
      activado,
      expanded: ref(['Procesos (with avatar)', 'Good food (with icon)']),

      simple: [
        {
          id: '1',
          label: 'Procesos (with avatar)',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              id: '1.1',
              label: 'Identificación del establecimiento',
              children: [
                {
                  id: '1.1.1',
                  label: 'Quality ingredients',
                  children: [
                    { id: '1.1.1.1', label: 'Good quality', children: [{ label: 'Longitud total de la red de distribucion de empanadas calientes' }] },
                  ]
                },
                { id: '1.1.2', label: 'Good recipe' }
              ]
            },
            {
              id: '1.2',
              label: 'Concepto sanitario de ultima visita sanitaria (disabled node with icon)',
              icon: 'room_service',
              disabled: true,
              children: [
                { id: '1.2.1', label: 'Prompt attention' },
                { id: '1.2.2', label: 'Professional waiter' }
              ]
            },
            {
              id: '1.3',
              label: 'Edificacion e instalaciones',
              icon: 'photo',
              children: [
                {
                  id: '1.3.1',
                  label: 'Happy atmosphere (with image)',
                  img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
                },
                { id: '1.3.2', label: 'Good table presentation' },
                { id: '1.3.3', label: 'Pleasing decor' }
              ]
            }
          ]
        }
      ]
    }
  }
})
</script>
