import { TreeItem } from 'src/constants/Interfaces'

export const nodes1: TreeItem[] = [
  {
    code: '1',
    label: 'Generalidades',
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
        label: 'Motivo de la visita',
        selectable: true,
      }
    ]
  }
]

export const nodes2: TreeItem[] = [
  {
    code: '1',
    label: 'Condiciones sanitarias de instalaciones y proceso',
    selectable: false,
    children: [
      {
        code: '1.1',
        id: 2,
        label: 'Edificaciones e instalaciones',
        selectable: true
      },
      {
        code: '1.2',
        id: 3,
        label: 'Saneamiento',
        selectable: true
      }
    ]
  }
]

export const nodes3: TreeItem[] = [
  {
    code: '1',
    id: 4,
    label: 'Concepto sanitario',
    selectable: true
  }
]

export const nodes4: TreeItem[] = [
  {
    code: '1',
    label: 'Puntos',
    selectable: false,
    children: [
      {
        code: '1.1',
        id: 5,
        label: 'Relación de las muestras tomadas en el establecimiento',
        selectable: true
      },
      {
        code: '1.2',
        id: 6,
        label: 'Requerimientos sanitarios',
        selectable: true
      },
      {
        code: '1.3',
        id: 7,
        label: 'Aplicación de medida sanitaria de seguridad',
        selectable: true
      },
      {
        code: '1.4',
        id: 8,
        label: 'Observaciones',
        selectable: true
      }
    ]
  }
]
