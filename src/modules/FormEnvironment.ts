/**
 * Clase que expone las props de configuracion del componente PrincipalView.vue
 * por fromulario.
 * Aqui se deben registrar todos los archivos init.ts que seran utilizados
 * @class FormEnvironment
 */
export class FormEnvironment {
  static initial: () => boolean = () => true // solo es usada para servir como tipo de dato y no tiene uso
  static FAMA01: () => Promise<any> = () => import('pages/formats/F-AM-A-01/Init.ts')
  static FEV04: () => Promise<boolean> = () => Promise.resolve(true)
}
