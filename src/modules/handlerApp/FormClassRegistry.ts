// import { Form as form02 } from 'src/pages/formats/F-AM-A-02/Form.module'
import { form as form02 } from 'src/pages/formats/F-AM-A-02/Form.module'
import { form as form08 } from 'src/pages/formats/F-AM-A-08/Form.module'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { FormActions } from 'src/constants/Interfaces'

/**
 * Aqui serán registradas todas las clases de los formularios
 */
// export const formClassRegistry: { [K in Exclude<keyof typeof FormEnvironment, 'prototype'>]: typeof form02 } = {
// FAMA02: form02,
// FAMA08: form08,
//MyComponent2: Form
// }

export const formClassRegistry: { [K in Exclude<keyof typeof FormEnvironment, 'prototype'>]: FormActions } = {
  FAMA02: form02,
  FAMA08: form08
}
