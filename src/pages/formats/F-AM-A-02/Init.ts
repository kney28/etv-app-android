import { /* GroupCards, */ Config } from 'src/constants/Interfaces'
import { nodes1, nodes2, nodes3, nodes4 } from './Trees'

export const config: Config = {
  formatName: 'F-AM-A-02',
  dynamicComponent: 'FAMA02',
  headerTitle: 'Formato F-AM-A-02',
  headerContent: `Acta de inspección sanitaria con enfoque de riesgo para expendios de
    carne y/o productos cárnicos comestibles`,
  cardElements: [
    { label: 'Sección 1', description: 'Identificación del establecimiento' },
    { label: 'Sección 2', description: 'I. Condiciones sanitarias de instalaciones y proceso' },
    { label: 'Concepto', description: 'II. Concepto sanitario', iconName: '' },
    { label: 'Sección 3', description: 'Puntos III, IV, V y VI' }
  ],
  formValid: [
    false,
    false,
    true /* Espacio para representar la sección concepto */,
    false
  ],
  nodes: [nodes1, nodes2, nodes3, nodes4]
};
