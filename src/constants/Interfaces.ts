import { FormEnvironment } from 'src/modules/FormEnvironment'
import { AppMediator } from 'src/modules/handlerApp/Mediator'
import { MenuHandler, ButtonHandler, FilterHandler } from 'src/modules/handlerApp/Components'

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
   * Identificador que actuara en el array de de los modulos usados en
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

export type TableColumns = { [key: string]: string | number | boolean } | null

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
export type StaticRoutes = 'Upload' | 'Compartir'

interface NotificationGroups {
  'LOAD_DYNAMIC_COMPONENT': PagesList
  'LOAD_STATIC_ROUTE': StaticRoutes
  'ACTION_BUTTON': 'Save' | 'Upload' | 'Share' | 'Profile' | 'Logout' | 'ShowTree' | 'Check' | 'Close'
  'GENERALS_FILTERS': 'Municipality' | 'Neighborhood' | 'Adress' | 'Entity'
  'DATA_RETRIEVER': 'GetMunicipalities' | 'GetNeighborhoods' | 'GetDistricts' | 'GetEntities'
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
  validate(): Promise<boolean>
  save(): Promise<void>
  reset(): void
  checkSectionStatus(date: number): Promise<{ status: boolean, message: string }>
  setStores(): void
  validateSectionByCardKey(cardKey: number): boolean
}

export interface dataInsert {
  id: number,
  identificadorEntrevista: string
}

export interface MediatorState {
  mediator: AppMediator | null
  menuHandler: MenuHandler | null
  buttonHandler: ButtonHandler | null
  filterHandler: FilterHandler | null
}
