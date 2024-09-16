import { PagesList, StaticRoutes } from 'src/constants/Interfaces'
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
  id?: PagesList | StaticRoutes
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
        label: 'Alimentos',
        iconName: 'fa-solid fa-plate-wheat',
        children: [
          {
            id: 'FAMA01',
            label: 'Formulario F-AM-A-01',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA02',
            label: 'Formulario F-AM-A-02',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA03',
            label: 'Formulario F-AM-A-03',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA04',
            label: 'Formulario F-AM-A-04',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA05',
            label: 'Formulario F-AM-A-05',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA06',
            label: 'Formulario F-AM-A-06',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA07',
            label: 'Formulario F-AM-A-07',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA08',
            label: 'Formulario F-AM-A-08',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA09',
            label: 'Formulario F-AM-A-09',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA10',
            label: 'Formulario F-AM-A-10',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          },
          {
            id: 'FAMA29',
            label: 'Formulario F-AM-A-29',
            iconColor: 'Black',
            iconName: 'fa-solid fa-marker',
            onClick: true
          }
        ]
      }
    ]
  },
  {
    id: 'Upload',
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
