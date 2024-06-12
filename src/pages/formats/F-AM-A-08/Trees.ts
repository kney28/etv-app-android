import { TreeItem } from 'src/constants/Interfaces'

export const nodes1: TreeItem[] = [
  {
    code: '1',
    label: 'Aspectos generales',
    selectable: false,
    children: [
      {
        code: '1.1',
        id: 0,
        label: 'Identificación del establecimiento',
        selectable: true
      },
      {
        code: '1.2',
        id: 1,
        label: 'Concepto sanitario de ultima visita sanitaria (disabled node with icon)',
        icon: 'room_service',
        disabled: true,
      }
    ]
  }
]

export const nodes2: TreeItem[] = [
  {
    code: '1',
    label: 'Procesos',
    selectable: false,
    children: [
      {
        code: '1.1',
        id: 0,
        label: 'Identificación del establecimiento',
        selectable: false
      },
      {
        code: '1.2',
        id: 1,
        label: 'Concepto sanitario de ultima visita sanitaria (disabled node with icon)',
        icon: 'room_service',
        disabled: true
      }
    ]
  }
]
