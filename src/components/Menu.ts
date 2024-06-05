
/**
 * Interface para los elementos del menú que contienen sub-elementos.
 * 
 * @interface MenuItemBase
 */
interface MenuItemBase {
  /**
   * Nombre de la opción.
   * @type {string}
   */
  label: string
  /**
   * Identificador unico que será devuelto al hacer click sobre la opción si la opción onClick = true.
   * @type {string}
   */
  id?: string
  /**
   * Ruta de la opción. no usar junto con onClick. Aunque ambas opciones manejan rutas
   * to se usa como una definicion de ruta directa sin procesar.
   * @type {string}
   */
  to?: string
  /**
   * Indica si la opción es un elemento de menú que dispara una acción al hacer click.
   * @type {boolean}
   */
  onClick?: boolean
  /**
   * Nombre de la icono de la opción.
   * @type {string}
   */
  iconName?: string
  /**
   * Color de la icono de la opción.
   * @type {string}
   */
  iconColor?: string
}

// Interface para los elementos del menú que contienen sub-elementos
interface MenuParent extends MenuItemBase {
  children: MenuItem[];
}

// Unión de tipos para un elemento de menú, que puede ser o no un contenedor de otros elementos
type MenuItem = MenuItemBase | MenuParent;

// Type Guard para diferenciar MenuParent de MenuItemBase
function isMenuParent(item: MenuItem): item is MenuParent {
  return 'children' in item;
}

export const menu: MenuItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    iconColor: 'orange',
    iconName: 'fa-solid fa-house'
  },
  {
    label: 'Actividades',
    children: [
      {
        label: 'Enfermedades transmitidas por vectores',
        iconName: 'fa-solid fa-mosquito',
        children: [
          {
            id: 'F-AM-1',
            label: 'Formulario F-EV-04',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          }
        ]
      }
    ]
  },
  {
    id: 'upload',
    label: 'Enviar',
    onClick: true,
    iconName: 'fa-solid fa-cloud-arrow-up',
    iconColor: 'primary'
  },
  {
    label: 'Compartir',
    to: '/profiles',
    iconName: 'fa-solid fa-share-nodes',
    iconColor: 'green',
  }
]