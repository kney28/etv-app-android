import { usePrincipal } from 'src/stores/principal'
import { useStatusNetwork } from 'src/stores/global'
import { useInners, Inners } from 'src/stores/global'
import { useRouter } from 'vue-router'
import { Builder, FilterFnParams } from './Builder'
import { PagesList, SpecificsForGroups, Config } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { formClassRegistry } from 'src/modules/handlerApp/FormClassRegistry'
import { QForm, useQuasar } from 'quasar'
import { Ref } from 'vue'
import { AxiosProgressEvent } from 'axios'

type QFormRef = Ref<InstanceType<typeof QForm>>

interface Forms {
  entity: QFormRef
  sampleRatio: QFormRef
  generalObservations: QFormRef
}

export enum FormName {
  /**
   * Todo formulario que no se deba validar deberá configurarse con:
   * currentForm = FormName.EMPTY
   */
  EMPTY = 'empty',
  ENTITY = 'entity',
  SAMPLE_RATIO = 'sampleRatio',
  GENERAL_OBSERVATIONS = 'generalObservations',
}


export interface GeneralDirector {
  loadComponent: (componentName: PagesList, environment: typeof FormEnvironment) => Promise<void>
  showTree: (cardKey: number) => void
  save: () => void
  check: () => void
  setForms: (form: QFormRef, assing: FormName.ENTITY | FormName.SAMPLE_RATIO | FormName.GENERAL_OBSERVATIONS) => void
  changeCardStatus: (cardKey?: number) => void
  filterfn: ({ val, update }: FilterFnParams, specificsForGroups: SpecificsForGroups<'GENERALS_FILTERS'>, id?: number) => Promise<object[]>
  updateEstablishments(): Promise<void>
  inicializeDB(): Promise<void>
  uploadVisits(): Promise<void>
}

export class Director implements GeneralDirector {
  principal
  inners
  $router
  builder
  forms: Forms
  $q
  simulationInterval!: ReturnType<typeof setInterval>
  constructor() {
    this.principal = usePrincipal()
    this.inners = useInners()
    this.$router = useRouter()
    this.builder = new Builder()
    this.builder.initializeNetworkListener()
    this.$q = useQuasar()
    this.forms = {
      entity: {} as QFormRef,
      sampleRatio: {} as QFormRef,
      generalObservations: {} as QFormRef
    }
  }

  setForms(form: QFormRef, assing: FormName.ENTITY | FormName.SAMPLE_RATIO | FormName.GENERAL_OBSERVATIONS) {
    this.forms[assing] = form
  }

  async loadComponent(componentName: SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>, environment: typeof FormEnvironment): Promise<void> {
    this.inners.type = Inners.Puff
    this.inners.visible = true
    if (this.principal.dynamicComponent !== 'initial') {
      /**
       * Aqui se libera la Store con el fin de no consumir mucha memoria, asi al cambiar de formulario
       * se ejecuta el resetStore para crear una nueva instancia de la Store
      */
      const formClass = formClassRegistry[this.principal.dynamicComponent]
      formClass.resetStore()
      console.log('Store liberada', this.principal.dynamicComponent)
    }
    this.principal.$reset()
    try {
      console.log(componentName)
      const { config }: { config: Config } = await environment[componentName]()
      this.principal.formatName = config.formatName
      this.principal.dynamicComponent = config.dynamicComponent
      this.principal.headerTitle = config.headerTitle
      this.principal.headerContent = config.headerContent
      this.principal.nodesCollection = config.nodes
      this.principal.cardElements = config.cardElements
      this.principal.formValid = [...config.formValid]
      console.log(config.formValid)
      this.principal.calculableSections = this.principal.formValid.filter((e: boolean | null) => e !== null).length
      this.principal.tableData = await this.builder.getVisits(config.formatName)
      this.resetCardStatus()
      if (await this.builder.checkGps()) {
        await this.$router.push({ name: 'Main' })
        this.inners.visible = false
      } else {
        await this.$router.push({ name: 'Index' })
        this.inners.visible = false
      }
    } catch (e) {
      this.inners.visible = false
      throw e
    }
  }

  showTree(cardKey: number) {
    this.principal.cardKey = cardKey
    this.principal.nodes = this.principal.nodesCollection[cardKey]
    this.principal.titleDialogTree = this.principal.cardElements[cardKey].description
    this.principal.visibleDialogTree = true
  }

  async save() {
    console.log(this.principal.formIsValid, this.principal.calculableSections, this.principal.formValid)
    if (!this.principal.formIsValid) {
      this.$q.notify({
        message: 'Ups! debes completar todas las secciones',
        color: 'warning'
      })
      return
    }
    this.inners.visible = true
    const component = this.principal.dynamicComponent
    const formClass = formClassRegistry[component]
    const userName = this.$q.localStorage.getItem('username')
    const result = await formClass.save(userName as string, await this.builder.printCurrentPosition())
    console.log(result)
    await this.builder.saveFile(result).then(async () => {
      this.$q.notify({
        message: 'Guardado exitosamente',
        color: 'positive'
      })
      formClass.resetValues()
      this.principal.tableData = await this.builder.getVisits(this.principal.formatName)
      this.principal.resetValues()
      this.inners.visible = false
    }).catch((e) => {
      this.inners.visible = false
      throw e
    })
  }

  async validateGeneralForms() {
    let result = false
    let isGeneralForm = false
    if (this.principal.currentForm === FormName.EMPTY) {
      /** Esto evita que los formularios o avisos informativos se validen */
      isGeneralForm = true
      result = true
    } else if (this.principal.currentForm === FormName.ENTITY) {
      isGeneralForm = true
      result = await this.forms.entity.value.validate()
    } else if (this.principal.currentForm === FormName.SAMPLE_RATIO) {
      isGeneralForm = true
      result = await this.forms.sampleRatio.value.validate()
    } else if (this.principal.currentForm === FormName.GENERAL_OBSERVATIONS) {
      isGeneralForm = true
      result = await this.forms.generalObservations.value.validate()
    }
    if (result) this.principal.visibleDialog = false

    return isGeneralForm
  }

  resetCardStatus() {
    this.principal.cardElements.forEach((element) => {
      element.iconName = 'fa-solid fa-xmark'
      element.iconColor = 'red'
    })
  }

  changeCardStatus(cardKey: number = this.principal.cardKey) {
    const component = this.principal.dynamicComponent
    const formClass = formClassRegistry[component]
    const result = formClass.validateSectionByCardKey(this.principal.cardKey)
    console.log('cardStatus', result)
    if (result) {
      this.principal.cardElements[cardKey].iconName = 'fa-solid fa-check'
      this.principal.cardElements[cardKey].iconColor = 'green'
      this.principal.formValid[cardKey] = result

      console.log(this.principal.formValid)
    } else {
      this.principal.cardElements[cardKey].iconName = 'fa-solid fa-xmark'
      this.principal.cardElements[cardKey].iconColor = 'red'
      this.principal.formValid[cardKey] = result
      console.log(this.principal.formValid)
    }
  }

  async check() {
    const component = this.principal.dynamicComponent
    console.log(this.principal.currentForm)
    const isGeneralForm = await this.validateGeneralForms()
    const formClass = formClassRegistry[component]
    formClass.setStores()
    console.log(this.principal.cardKey)
    this.changeCardStatus(this.principal.cardKey)
    if (!isGeneralForm) {
      /** se le quita 1 para que respete la posicion del array que usa checkSectionStatus */
      const updateCurrentForm = this.principal.currentForm as number - 1
      const result = await formClass.checkSectionStatus(updateCurrentForm)
      if (!result.status) {
        this.$q.notify({
          message: result.message,
          color: 'red'
        })
      } else {
        this.principal.visibleDialog = false
      }
      console.log(result)
    }
  }

  async filterfn({ val, update }: FilterFnParams, specificsForGroups: SpecificsForGroups<'GENERALS_FILTERS'>, id?: number): Promise<object[]> {
    return this.builder.filterFn({ val, update }, specificsForGroups, id)
  }

  handleProgress(progressEvent: AxiosProgressEvent) {
    const percentCompleted = (progressEvent.loaded / progressEvent.total!) * 100
    console.log(`Progress: ${percentCompleted.toFixed(2)}%`)
    /* this.inners.type = Inners.Facebook
    this.inners.label = `${percentCompleted.toFixed(2)}%`
    this.inners.visible = true
    console.log(`Progress: ${percentCompleted.toFixed(2)}%`)

    if (percentCompleted >= 100) {
      this.inners.label = 'Datos actualizados!'
      setTimeout(() => {
        this.inners.visible = false
      }, 1000);
    } */
  }

  startProgress() {
    this.inners.type = Inners.Facebook
    this.inners.label = ''
    this.inners.visible = true

    let simulatedProgress = 0
    this.simulationInterval = setInterval(() => {
      simulatedProgress += 2
      this.inners.label = `${simulatedProgress}%`

      if (simulatedProgress >= 100) {
        this.inners.label = `100%`
      }
    }, 200);
  }

  stopProgress(finalLabel: string) {
    clearInterval(this.simulationInterval);
    this.inners.label = finalLabel;

    setTimeout(() => {
      this.inners.visible = false;
    }, 2600);
  }

  async updateEstablishments() {
    if (!await this.builder.checkInternetConnection()) {
      throw new Error('Sin conexión a internet, entrando en modo offline')
    }
    try {
      const timestamp = await this.builder.getTimestamp()
      const username = this.$q.localStorage.getItem('username') as string
      const password = this.$q.localStorage.getItem('password') as string
      const user = { username, password, timestamp }
      this.startProgress()
      const establishments = await this.builder.getEstablishments(user)

      if (establishments.establecimientos.length === 0) {
        this.stopProgress('Finalizando...')
        return
      }
      const parseToimport = this.builder.parseToImportFromJSON(establishments.establecimientos)
      const result = await this.builder.importFromJSON(parseToimport)
      this.stopProgress(`Establecimientos actualizados: (${result.changes?.changes})`)
    } catch (error: any) {
      this.inners.visible = false
      throw new Error(`Error actualizando establecimientos: ${error.message || error}`)
    }
  }

  async inicializeDB() {
    try {
      this.inners.type = Inners.Puff
      this.inners.visible = true
      await this.builder.createDatabase()
      await this.builder.createSyncTable()
      await this.builder.insertMunicipalities()
      await this.builder.insertEstablishmentsDevMode()
      this.inners.visible = false
    } catch (error: any) {
      this.inners.visible = false
      throw new Error(`Error en base de datos: ${error.message || error}`)
    }
  }

  async uploadVisits(): Promise<void> {
    if (!await this.builder.checkInternetConnection()) {
      throw new Error('Sin conexión a internet, intente en otro momento')
    }
    try {
      const username = this.$q.localStorage.getItem('username') as string
      const password = this.$q.localStorage.getItem('password') as string
      const { formData, files } = await this.builder.prepareSubmissionData(username, password)
      this.startProgress()
      await this.builder.submitVisits(formData)
      await this.builder.logFileHistory(files, username)
      this.stopProgress('')
      this.$q.notify({
        message: 'Carga exitosa',
        color: 'green'
      })
    } catch (error: any) {
      this.inners.visible = false
      throw new Error(`${error.message || error}`)
    }
  }
}
