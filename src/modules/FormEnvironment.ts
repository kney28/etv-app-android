/**
 * Clase que expone las props de configuracion del componente PrincipalView.vue
 * por fromulario.
 * Aqui se deben registrar todos los archivos init.ts que seran utilizados
 * @class FormEnvironment
 */
export class FormEnvironment {
  static initial: () => boolean = () => true // solo es usada para servir como tipo de dato y no tiene uso
  static FAMA08: () => Promise<any> = () => import('pages/formats/F-AM-A-08/Init.ts')
  static FAMA01: () => Promise<any> = () => import('pages/formats/F-AM-A-01/Init.ts')
  static FAMA02: () => Promise<any> = () => import('pages/formats/F-AM-A-02/Init.ts')
  static FAMA03: () => Promise<any> = () => import('pages/formats/F-AM-A-03/Init.ts')
  static FAMA04: () => Promise<any> = () => import('pages/formats/F-AM-A-04/Init.ts')
  static FAMA05: () => Promise<any> = () => import('pages/formats/F-AM-A-05/Init.ts')
  static FAMA06: () => Promise<any> = () => import('pages/formats/F-AM-A-06/Init.ts')
  static FAMA07: () => Promise<any> = () => import('pages/formats/F-AM-A-07/Init.ts')
  static FAMA09: () => Promise<any> = () => import('pages/formats/F-AM-A-09/Init.ts')
  static FAMA10: () => Promise<any> = () => import('pages/formats/F-AM-A-10/Init.ts')
  static FAMA29: () => Promise<any> = () => import('pages/formats/F-AM-A-29/Init.ts')
}
