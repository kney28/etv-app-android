import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TreeItem, GroupCards, TableData, TableColumns, PagesList } from 'src/constants/Interfaces'

interface Principal {
  /** @property {string} nombre del formato del formulario */
  formatName: string
  /** @property {number | string} sección del formulario activa actualmente
   * esta propiedad es usada para identificar a la store asociada la
   * seccion del formulario
   */
  currentForm: number | string
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
  /** @property {boolean[]} puntos críticos */
  criticalPoints: boolean[]
  /** @property {number} clave de la tarjeta actual */
  cardKey: number
  /** Array que contendrá el estado de cada sección validable o calculable */
  formValid: boolean[]
  /** Indica la longitud que debera tener el array formValid[], este numero se usa
  * con el fin de definir cuantas secciones son validables o calculables
  * para con ello indicar que el formulario esta listo para envío
  */
  calculableSections: number
}

export const usePrincipal = defineStore('principal', {
  state: (): Principal => ({
    formatName: '',
    formValid: [],
    calculableSections: 0,
    cardKey: 0,
    currentForm: 0,
    progressBar: 0,
    dynamicComponent: 'initial',
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
    nodes: [],
    criticalPoints: []
  }),
  getters: {
    hasCriticalPoints(state) {
      return state.criticalPoints.length > 0
    },
    formIsValid(state) {
      return state.formValid.filter(e => !!e).length === state.calculableSections
    }
  },
  actions: {
    toggleCriticalPoint(value: boolean) {
      value ? this.criticalPoints.push(value) : this.criticalPoints.pop()
    },
    resetStore() {
      this.$reset()
    },
    resetValues() {
      this.criticalPoints = []
      for (let i = 0; i < this.cardElements.length; i++) {
        this.cardElements[i].iconName = 'fa-solid fa-xmark'
        this.cardElements[i].iconColor = 'red'
      }
    }
  }
})

export const useEntityIdentification = defineStore('entityIdentification', {
  state: () => ({
    form: ref<null | InstanceType<typeof import('quasar').QForm>>(null),
    fechaRealizacion: null,
    municipio: null,
    optMunicipios: [],
    establecimiento: null,
    optEntidades: [],
    direccion: null,
    optDirecciones: [],
    email: null
  }),
  actions: {
    resetStore() {
      this.$reset()
    },
    resetValues() {
      this.fechaRealizacion = null
      this.municipio = null
      this.optMunicipios = []
      this.establecimiento = null
      this.optEntidades = []
      this.direccion = null
      this.optDirecciones = []
      this.email = null
    }
  }
})

export const useGeneralities = defineStore('generalities', {
  state: () => ({
    motivoVisita: null,
    motivoVisitaEsp: null,
    muestrasTomadas: null,
    actaTomaMuestras: null,
    requerimientosSanitarios: null,
    medidaSanitaria: null,
    obsMedidaSanitaria: null,
    obsAutoridadSanitaria: null,
    obsEstablecimiento: null
  }),
  actions: {
    resetStore() {
      this.$reset()
    },
    resetValues() {
      this.motivoVisita = null
      this.motivoVisitaEsp = null
      this.muestrasTomadas = null
      this.actaTomaMuestras = null
      this.requerimientosSanitarios = null
      this.medidaSanitaria = null
      this.obsMedidaSanitaria = null
      this.obsAutoridadSanitaria = null
      this.obsEstablecimiento = null
    }
  }
})
