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
      },
      {
        code: '1.3',
        id: 2,
        label: 'Revisión documental',
        selectable: true,
      }
    ]
  }
]

export const nodes2: TreeItem[] = [
  {
    code: '1',
    label: 'Condiciones locativas,sanitarias y de seguridad',
    selectable: false,
    children: [
      {
        code: '1.1',
        id: 3,
        label: 'Condiciones locativas y áreas',
        selectable: true
      },
      {
        code: '1.2',
        id: 4,
        label: 'Condiciones de laboratorios',
        selectable: true
      },
      {
        code: '1.3',
        id: 5,
        label: 'Condiciones sanitarias',
        selectable: true
      },
      {
        code: '1.4',
        label: 'Condiciones de saneamiento',
        selectable: false,
        children: [
          {
            code: '1.4.1',
            id: 6,
            label: 'Abastecimiento de agua',
            selectable: true
          },
          {
            code: '1.4.2',
            id: 7,
            label: 'Manejo y disposición de vertimientos',
            selectable: true
          },
          {
            code: '1.4.3',
            id: 8,
            label: 'Manejo de residuos solidos',
            selectable: true
          },
          {
            code: '1.4.4',
            id: 9,
            label: 'Manejo integrado de plagas',
            selectable: true
          }
        ]
      },
      {
        code: '1.5',
        id: 10,
        label: 'Condiciones de seguridad - gestión del riesgo',
        selectable: true
      }
    ]
  }
]

export const nodes3: TreeItem[] = [
  {
    code: '1',
    id: 11,
    label: 'Cumplimiento de condiciones sanitarias',
    selectable: true
  }
]

export const nodes4: TreeItem[] = [
  {
    code: '1',
    label: 'Últimos pasos',
    selectable: false,
    children: [
      {
        code: '1.1',
        id: 12,
        label: 'Relación de las muestras tomadas en el establecimiento',
        selectable: true
      },
      {
        code: '1.2',
        id: 13,
        label: 'Requerimientos sanitarios',
        selectable: true
      },
      {
        code: '1.3',
        id: 14,
        label: 'Observaciones',
        selectable: true
      },
      {
        code: '1.4',
        id: 15,
        label: 'Medida sanitaria',
        selectable: true
      },
      {
        code: '1.5',
        id: 16,
        label: 'Plazo cumplimiento de exigencias',
        selectable: true
      }
    ]
  }
]
