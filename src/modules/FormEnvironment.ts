/**
 * Clase que expone las props de configuracion del componente PrincipalView.vue
 * por fromulario.
 * Aqui se deben registrar todos los archivos init.ts que seran utilizados
 * @class FormEnvironment
 */
export class FormEnvironment {
  static initial: () => boolean = () => true // solo es usada para servir como tipo de dato y no tiene uso
  static FAMA08: () => Promise<any> = () => import('pages/formats/F-AM-A-08/Init.ts')
  static FAMA02: () => Promise<any> = () => import('pages/formats/F-AM-A-02/Init.ts')
}
