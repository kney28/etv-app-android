import { Form } from 'src/pages/formats/F-AM-A-08/Form.module'
import { FormEnvironment } from 'src/modules/FormEnvironment'

/**
 * Aqui serán registradas todas las clases de los formularios
 */
export const formClassRegistry: { [K in Exclude<keyof typeof FormEnvironment, 'prototype'>]: typeof Form } = {
  FAMA08: Form,
  MyComponent2: Form
}
