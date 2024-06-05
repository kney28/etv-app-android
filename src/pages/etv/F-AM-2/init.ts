export const nodes: any[] = [
  {
    id: '1',
    label: 'Procesos (with Javier Loaiza)',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        id: '1.1',
        label: 'Identificación del establecimiento',
        selectable: false,
        children: [
          {
            id: '1.1.1',
            label: 'Quality ingredients',
            children: [
              { id: '1.1.1.1', label: 'Good quality', children: [{ id: '1.1.1.2', label: 'Longitud total de la red de distribucion de empanadas calientes' }] },
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