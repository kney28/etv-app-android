import { defineStore } from 'pinia'
import { TreeItem, GroupCards, TableData, TableColumns, PagesList } from 'src/constants/Interfaces'

interface Principal {
  /** @property {string} pagina actual */
  page: string
  /** @property {number} barra de progreso */
  progressBar: number
  /** @property {string} componente dinamico */
  dynamicComponent: PagesList
  /** @property {string} titulo del dialogo que contiene el q-tree */
  titleDialogTree: string
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
  /** @property {TreeItem[]} colección de arreglos de elementos tipo q-tree */
  nodesCollection: TreeItem[][]
  /** @property {TreeItem[]} nodo para el q-tree */
  nodes: TreeItem[]
}

export const usePrincipal = defineStore('principal', {
  state: (): Principal => ({
    page: 'F-AM-1',
    progressBar: 0,
    dynamicComponent: 'MyComponent2',
    titleDialogTree: '',
    visibleDialogTree: false,
    visibleDialog: false,
    headerTitle: 'Formato de prueba',
    headerContent: 'Este formato desde una Store',
    cardElements: [],
    tableData: [
      { id: '1', formato: 'F-AM-1' },
      { id: '2', formato: 'F-AM-2' },
      { id: '3', formato: 'F-AM-3' },
      { id: '4', formato: 'F-AM-4' }
    ],
    tableColumns: [
      { name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true },
      { name: 'formato', align: 'left', label: 'Formato', field: 'formato', sortable: true }
    ],
    nodesCollection: [],
    nodes: []
  })
})

export const useEntityIdentification = defineStore('entityIdentification', {
  state: () => ({
    fechaRealizacion: null,
    municipio: null,
    optMunicipios: [],
    establecimiento: null,
    optEntidades: [],
    direccion: null,
    optDirecciones: [],
    email: null
  })
})

export const useGeneralities = defineStore('generalities', {
  state: () => ({
    motivoVisita: null,
    motivoVisitaEsp: '',
    muestrasTomadas: 0,
    actaTomaMuestras: '',
    medidaSanitaria: null,
    obsMedidaSanitaria: null,
    obsAutoridadSanitaria: null,
    obsEstablecimiento: null
  })
})
