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
   * Identificador unico que será devuelto al hacer click sobre la opción.
   * @type {string}
   */
  id?: string
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

/**
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

export interface GroupCards {
  label: string
  iconColor?: string
  iconName?: string
}

export type TableData = { [key: string]: string | number | boolean } | null

export type TableColumns = { [key: string]: string } | null

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
 *Tipo para la lista de paginas dinamicas.
 * @type PagesList
 */
export type PagesList = keyof DynamicComponents