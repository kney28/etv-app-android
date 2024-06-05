import { defineStore } from 'pinia'
import { TreeItem, GroupCards, TableData, TableColumns, PagesList } from 'src/constants/Interfaces'

interface Principal {
  /** @property {string} pagina actual */
  page: string
  /** @property {string} componente dinamico */
  dynamicComponent: PagesList
  /** @property {boolean} visibilidad del dialogo que contiene el q-tree */
  visibleDialogTree: boolean
  /** @property {boolean} visibilidad del dialogo que contiene los forms */
  visibleDialog: boolean
  /** @property {string} titulo del encabezado */
  headerTitle: string
  /** @property {string} contenido del encabezado */
  headerContent: string
  /** @property {string} grupo de elementos q-card*/
  cardElements: GroupCards[]
  /** @property {TableData[]} datos para la tabla */
  tableData: TableData[] | null
  /** @property {TableColumns[]} nombres de las columnas de la tabla */
  tableColumns: TableColumns[] | null
  /** @property {TreeItem[]} datos para el q-tree */
  nodes: TreeItem[]
}

export const usePrincipal = defineStore('principal', {
  state: (): Principal => ({
    page: 'F-AM-1',
    dynamicComponent: 'MyComponent2',
    visibleDialogTree: false,
    visibleDialog: false,
    headerTitle: 'Formato de prueba',
    headerContent: 'Este formato desde una Store',
    cardElements: [],
    tableData: [],
    tableColumns: [],
    nodes: []
  })
})