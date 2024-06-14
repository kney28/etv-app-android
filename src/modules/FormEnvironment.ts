/**
 * Clase que expone las props de configuracion del componente PrincipalView.vue
 * por fromulario.
 * Aqui se deben registrar todos los archivos init.ts que seran utilizados
 * @class FormEnvironment
 */
export class FormEnvironment {
  static MyComponent2: () => Promise<any> = () => import('pages/formats/F-AM-2/Init.ts')
  static FAMA08: () => Promise<any> = () => import('pages/formats/F-AM-A-08/Init.ts')
  static FAMA02: () => Promise<any> = () => import('pages/formats/F-AM-A-02/Init.ts')
}
