import { Config } from 'src/constants/Interfaces'
import { nodes1, nodes2, nodes3, nodes4 } from './Trees'

export const config: Config = {
  formatName: 'F-AM-A-29',
  dynamicComponent: 'FAMA29',
  headerTitle: 'Formato F-AM-A-29',
  headerContent: `Acta de inspección, vigilancia y control sanitario
  establecimientos educativos con laboratorio`,
  cardElements: [
    { label: 'Sección 1', description: 'Identificación del establecimiento' },
    { label: 'Sección 2', description: 'I. Condiciones locativas,sanitarias y de seguridad' },
    { label: 'Concepto', description: 'II. Cumplimiento de condiciones sanitarias', iconName: '' },
    { label: 'Sección 3', description: 'Últimos pasos' }
  ],
  formValid: [
    false,
    false,
    true /* Espacio para representar la sección concepto */,
    false
  ],
  nodes: [nodes1, nodes2, nodes3, nodes4]
};
