import { FormEnvironment } from 'src/modules/FormEnvironment'
import { AppMediator } from 'src/modules/handlerApp/Mediator'
import { MenuHandler, ButtonHandler, FilterHandler, InitialSetup, StaticRouteHandler } from 'src/modules/handlerApp/Components'

/**
 * Interface para los elementos del menú que contienen sub-elementos.
 *
 * @interface TreeItemBase
 */
interface TreeItemBase {
  /**
   * Nombre de la opción.
   * @type {string}
   */
  label: string
  /**
   * Identificador que actuara en el array de los modulos usados en
   * DynamicComponent.vue
   * @type {string}
   */
  id?: number
  /**
   * Identificador unico que será devuelto al hacer click sobre la opción.
   * @type {string}
   */
  code: string
  /**
   * Ruta al componente que se renderiza
   * @type {string}.
   * Ej: 'https://cdn.quasar.dev/img/boy-avatar.png'
   */
  avatar?: string
  /**
   * Indica si la opción puede ser seleccionada.
   * @type {boolean}
   */
  selectable?: boolean
  /**
   * Indica si la opción es deshabilitada.
   * @type {boolean}
   */
  disabled?: boolean
  /**
   * Indica el icono de la aplicación.
   * @type {string}
   */
  icon?: string
  /**
   * Especifica una imagen como icono.
   */
  img?: string
}

// Interface para los elementos del menú que contienen sub-elementos
interface TreeParent extends TreeItemBase {
  children: TreeItem[]
}

// Unión de tipos para un elemento de menú, que puede ser o no un contenedor de otros elementos
export type TreeItem = TreeItemBase | TreeParent

// Type Guard para diferenciar TreeParent de TreeItemBase
function isTreeParent(item: TreeItem): item is TreeParent {
  return 'children' in item
}

/* Estuctura de un elemento Tree */

/*
const nodes: TreeItem[] = [
  {
    id: '1',
    label: 'Procesos (with Kevin)',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        id: '1.1',
        label: 'Identificación del establecimiento',
        icon: 'room_service',
        selectable: false,
        children: [
          {
            id: '1.1.1',
            label: 'Quality ingredients',
            disabled: true
          },
          {
            id: '1.1.2',
            label: 'Good recipe',
            img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
          }
        ]
      }
    ]
  }
  ]
*/

/**
 * Props para el componente GroupCards.vue
 * @property {string} label - Etiqueta del elemento
 * @property {string} description - Descripción del elemento
 * @property {string} iconColor - Color del icono
 * @property {string} iconName - Nombre del icono
 */
export interface GroupCards {
  label: string
  description: string
  iconColor?: string
  iconName?: string
}

export type TableData = { [key: string]: string | number | boolean } | null

export type TableColumns = { [key: string]: string | number | boolean | object } | null

/**
 * Interface para la comprobación de los formularios.
 * se declara a manera de lista de objetos todos los formularios
 * que seran utilizados por app.
 * @interface Components
 */
export interface DynamicComponents {
  FormPrueba: any;
  MyComponent2: any;
}

/**
 *Tipo para la lista de formularios dinamicos.
 *basado en la clase FormEnvironment
 * @type PagesList
 */
export type PagesList = Exclude<keyof typeof FormEnvironment, 'prototype'>

/**
 *Tipo para los enlaces estaticos id: 'upload'
 *@type StaticRoutes
 */
export type StaticRoutes = 'Upload' | 'Load_Share'

interface NotificationGroups {
  'LOAD_DYNAMIC_COMPONENT': PagesList
  'LOAD_STATIC_ROUTE': StaticRoutes
  'ACTION_BUTTON': 'Save' | 'Upload' | 'Share' | 'Profile' | 'Logout' | 'ShowTree' | 'Check' | 'Close'
  'GENERALS_FILTERS': 'Municipality' | 'Neighborhood' | 'Address' | 'Entity'
  'DATA_RETRIEVER': 'GetMunicipalities' | 'GetNeighborhoods' | 'GetDistricts' | 'GetEntities'
  'CONFIGURATION': 'InitialSetup'
}

export type SpecificsForGroups<G extends keyof NotificationGroups> = NotificationGroups[G]

export type NotifyType = <G extends keyof NotificationGroups>(
  groupEvent: G,
  specificEvent: SpecificsForGroups<G>,
  sender: any
) => void

export type NotifyForGroup<G extends keyof NotificationGroups> = (
  specificEvent: SpecificsForGroups<G>,
  sender?: any
) => void

export interface FormActions {
  /**
   * Prepara los datos para ser guardados en la base de datos
   * @param {string} userName - Código del usuario
   * @param {object} GPS - Objeto con la ubicación del usuario
   */
  save(userName: string, GPS: { [key: string]: any }): Promise<DataInsert>
  /**
   * Funcion en la que se encapsulan las acciones de reseteo de valores
   * de las Stores resetValues()
   */
  resetValues(): void
  /**
   * Resetea la instancia de la Store del formulario en cuestión.
   * Este proceso libera la memoria ya que se restablece la Store
   */
  resetStore(): void
  /**
   * Valida un formulario que desprende de TreeItem
   * @param {number} currentForm número asociado al formulario actual
   */
  checkSectionStatus(currentForm: number): Promise<{ status: boolean, message: string }>
  /**
   * Asigna las Stores correspondientes
   */
  setStores(): void
  /**
   * Valida toda una sección o card
   * @param {number} cardKey - La clave de la tarjeta a validar.
   */
  validateSectionByCardKey(cardKey: number): boolean
}

export interface DataInsert {
  id: string
  identificadorEntrevista: string
  [key: string]: any
}

export interface MediatorState {
  mediator: AppMediator | null
  menuHandler: MenuHandler | null
  buttonHandler: ButtonHandler | null
  filterHandler: FilterHandler | null
  initialSetup: InitialSetup | null
  staticRouteHandler: StaticRouteHandler | null
}

export interface Config {
  /** Nombre del formato */
  formatName: string
  /** Nombre del componente dinamico, este nombre sera usado para ser usado por toda la app */
  dynamicComponent: PagesList
  /** Titulo de la card superior */
  headerTitle: string
  /** Descripción del formato */
  headerContent: string
  /** Colección de Cards. Aqui se setean el total de secciones que existiran en el formulario */
  cardElements: GroupCards[]
  /**
   * indica la longitud que debera tener el array formValid[], este numero se usa
   * con el fin de definir cuantas secciones son validables o calculables
   * para con ello indicar que el formulario esta listo para envío.
   * Aquellas secciones o cards que sean de solo lectura definirlas como true.
  */
  formValid: boolean[]
  /** Aqui se establecen todos los menus tipo Tree */
  nodes: TreeItem[][]
}

export interface Establishment {
  id: number
  codigoCIIU: string
  correoEstablecimiento: string
  daneDepartamento: string
  daneMunicipio: string | null
  direccionEstablecimiento: string
  documentoEstablecimiento: string
  idAreaOperativa: number
  identificacionRepresentanteLegal: string
  nombreActividad: string
  nombreBarrio: string | null
  nombreComercial: string
  nombreComuna: string | null
  nombreCorregimiento: string | null
  nombreCorregimientoVeredaLocalidadSector: string | null
  nombreDepartamento: string
  nombreEstablecimiento: string
  nombreLocalidad: string | null
  nombreMunicipio: string
  nombreprofesional1: string | null
  nombreprofesional2: string | null
  nombreRepresentanteLegal: string | null
  nombreTipoEstablecimiento: string
  nombreYCargoRepresentanteLegal: string | null
  razonSocial: string
  tarjetaprofesional1: string | null
  tarjetaprofesional2: string | null
  telefonoEstablecimiento: string
  tipoIdentificacionRepresentanteLegal: string
  sql_deleted: string
  last_modified: string
}

export interface EstablishmentsResponse {
  establecimientos: Establishment[];
}

export type Table = {
  name: string;
  values: Array<Array<number | string | null>>;
}

export type PartialImport = {
  database: string;
  version: number;
  encrypted: boolean;
  mode: string;
  tables: Table[];
}

export interface DataResponseServer {
  error?: number
  mensaje: string
  trace?: string
}
