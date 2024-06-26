import { GroupCards } from 'src/constants/Interfaces'
import { nodes1, nodes2, nodes3, nodes4 } from './Trees'

export const dynamicComponent = 'FAMA02'
export const headerTitle = 'Formato de F-AM-A-02'
export const headerContent = `Acta de inspección sanitaria con enfoque de riesgo para expendios de
  carne y/o productos cárnicos comestibles`
export const cardElements: GroupCards[] = [
  { label: 'Sección 1', description: 'Identificación del establecimiento' },
  { label: 'Sección 2', description: 'I. Condiciones sanitarias de instalaciones y proceso' },
  { label: 'Concepto', description: 'II. Concepto sanitario', iconName: '' },
  { label: 'Sección 3', description: 'Puntos III, IV, V y VI' }
]
// indica la longitud que debera tener el array formValid[], este numero se usa
// con el fin de definir cuantas secciones son validables o calculables
// para con ello indicar que el formulario esta listo para envío
export const formValid: (boolean | null)[] = [
  false,
  false,
  null /* Espacio para representar la seccion concepto*/,
  false]

export const nodes = [nodes1, nodes2, nodes3, nodes4]
