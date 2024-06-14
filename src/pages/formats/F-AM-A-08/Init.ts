import { GroupCards } from 'src/constants/Interfaces'
import { nodes1, nodes2, nodes3, nodes4 } from './Trees'

export const dynamicComponent = 'FAMA08'
export const headerTitle = 'Formato de F-AM-A-08'
export const headerContent = 'Acta de inspeccion sanitaria con enfoque de riesgo para plazas de mercado o central de abastos'
export const cardElements: GroupCards[] = [
  { label: 'Sección 1', description: 'Identificación del establecimiento' },
  { label: 'Sección 2', description: 'I. Condiciones sanitarias de instalaciones y proceso' },
  { label: 'Concepto', description: 'II. Concepto sanitario' },
  { label: 'Sección 3', description: 'Puntos III, IV, V y VI' }
]

export const nodes = [nodes1, nodes2, nodes3, nodes4]
