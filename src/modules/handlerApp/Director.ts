import { usePrincipal } from 'src/stores/principal'
import { useRouter } from 'vue-router'
import { Builder, FilterFnParams } from './Builder'
import { PagesList, SpecificsForGroups } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { formClassRegistry } from 'src/modules/handlerApp/FormClassRegistry'
import { QForm, useQuasar } from 'quasar'
import { Ref } from 'vue'

type QFormRef = Ref<InstanceType<typeof QForm>>

interface Forms {
  entity: QFormRef
  sampleRatio: QFormRef
  generalObservations: QFormRef
}

export enum FormName {
  ENTITY = 'entity',
  SAMPLE_RATIO = 'sampleRatio',
  GENERAL_OBSERVATIONS = 'generalObservations'
}


export interface GeneralDirector {
  loadComponent: (componentName: PagesList, environment: typeof FormEnvironment) => void
  showTree: (cardKey: number) => void
  save: () => void
  check: () => void
  setForms: (form: QFormRef, assing: FormName) => void
  changeCardStatus: (cardKey?: number) => void
  filterfn: ({ val, update }: FilterFnParams, specificsForGroups: SpecificsForGroups<'GENERALS_FILTERS'>, id?: number) => Promise<object[]>
}

export class Director implements GeneralDirector {
  principal
  $router
  builder
  forms: Forms
  $q
  constructor() {
    this.principal = usePrincipal()
    this.$router = useRouter()
    this.builder = new Builder()
    this.$q = useQuasar()
    this.forms = {
      entity: {} as QFormRef,
      sampleRatio: {} as QFormRef,
      generalObservations: {} as QFormRef
    }
  }

  setForms(form: QFormRef, assing: FormName) {
    this.forms[assing] = form
  }

  async loadComponent(componentName: SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>, environment: typeof FormEnvironment) {
    try {
      console.log(componentName)
      const { dynamicComponent, headerTitle, headerContent, nodes, cardElements, formValid } = await environment[componentName]()
      this.principal.dynamicComponent = dynamicComponent
      this.principal.headerTitle = headerTitle
      this.principal.headerContent = headerContent
      this.principal.nodesCollection = nodes
      this.principal.cardElements = cardElements
      this.principal.formValid = formValid
      this.principal.calculableSections = formValid.filter((e: boolean | null) => e !== null).length
      if (await this.builder.checkGps()) {
        this.$router.push({ name: 'Main' })
      } else {
        this.$router.push({ name: 'Index' })
      }
    } catch (e) {
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
    console.log(this.principal.formIsValid)
    // const component = this.principal.dynamicComponent
    // const entityIdentification = formStoreRegistry.EntityIdentification
    // const formClass = new formClassRegistry[component]
    // await formClass.validate()
    // await formClass.save()
    // formClass.reset()
  }

  async validateGeneralForms() {
    let result = false
    let isGeneralForm = false
    if (this.principal.currentForm === FormName.ENTITY) {
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
}
