import { GroupCards } from 'src/constants/Interfaces'
import { nodes1, nodes2 } from './Trees'

export const dynamicComponent = 'FAMA08'
export const headerTitle = 'Formato de F-AM-1'
export const headerContent = 'Este formato desde una Store'
export const cardElements: GroupCards[] = [
  { label: 'Card 1', description: 'Proceso de aguas' },
  { label: 'Card 2', description: 'Proceso de alimentos' },
  { label: 'Card 3', description: 'Proceso de bebidas' },
  { label: 'Card 4', description: 'Proceso de recolección' },
  { label: 'Card 5', description: 'Proceso de envío' }
]

export const nodes = [nodes1, nodes2]
