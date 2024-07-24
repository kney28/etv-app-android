import { form as initial } from 'src/pages/formats/Initial.module'
import { form as form01 } from 'src/pages/formats/F-AM-A-01/Form.module'
import { form as form02 } from 'src/pages/formats/F-AM-A-02/Form.module'
import { form as form03 } from 'src/pages/formats/F-AM-A-03/Form.module'
import { form as form04 } from 'src/pages/formats/F-AM-A-04/Form.module'
import { form as form05 } from 'src/pages/formats/F-AM-A-05/Form.module'
import { form as form06 } from 'src/pages/formats/F-AM-A-06/Form.module'
import { form as form07 } from 'src/pages/formats/F-AM-A-07/Form.module'
import { form as form08 } from 'src/pages/formats/F-AM-A-08/Form.module'
import { form as form09 } from 'src/pages/formats/F-AM-A-09/Form.module'
import { form as form10 } from 'src/pages/formats/F-AM-A-10/Form.module'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { FormActions } from 'src/constants/Interfaces'

/**
 * Aqui serán registradas todas las clases de los formularios
 */
export const formClassRegistry: { [K in Exclude<keyof typeof FormEnvironment, 'prototype'>]: FormActions } = {
  /**
   * initial solo se encarga de un estado inical resolucion de tipos mas no cumple una funcion
   * especifica
   */
  initial: initial,
  FAMA01: form01,
  FAMA02: form02,
  FAMA03: form03,
  FAMA04: form04,
  FAMA05: form05,
  FAMA06: form06,
  FAMA07: form07,
  FAMA08: form08,
  FAMA09: form09,
  FAMA10: form10
}
