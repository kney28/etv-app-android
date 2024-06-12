import { usePrincipal } from 'src/stores/principal'
import { useRouter } from 'vue-router'
import { PagesList, SpecificsForGroups } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { formStoreRegistry } from 'src/modules/handlerApp/FormStoreRegistry'
import { formClassRegistry } from 'src/modules/handlerApp/FormClassRegistry'
// import { Form } from 'src/pages/formats/F-AM-A-08/Form.module'

export interface GeneralDirector {
  loadComponent: (componentName: PagesList, environment: typeof FormEnvironment) => void
  showTree: (cardKey: number) => void
  save: () => void
}

export class Director implements GeneralDirector {
  principal
  $router
  constructor() {
    this.principal = usePrincipal()
    this.$router = useRouter()
  }
  /* async loadComponent(componentName: SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>, InitMap: { [key in PagesList]: () => Promise<any> }) {
    try {
      const { nodes } = await InitMap[componentName]()
      this.principal.nodes = nodes
      console.log(this.principal.nodes)
      this.$router.push({ name: 'F-EV-04' })
    } catch (e) {
      throw e
    }
  } */

  async loadComponent(componentName: SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>, environment: typeof FormEnvironment) {
    try {
      console.log(componentName)
      const { dynamicComponent, headerTitle, headerContent, nodes, cardElements } = await environment[componentName]()
      this.principal.dynamicComponent = dynamicComponent
      this.principal.headerTitle = headerTitle
      this.principal.headerContent = headerContent
      this.principal.nodesCollection = nodes
      this.principal.cardElements = cardElements
      console.log(this.principal.nodes)
      this.$router.push({ name: 'Main' })
    } catch (e) {
      throw e
    }
  }

  showTree(cardKey: number) {
    this.principal.nodes = this.principal.nodesCollection[cardKey]
    this.principal.titleDialogTree = this.principal.cardElements[cardKey].description
    this.principal.visibleDialogTree = true
  }

  async save() {
    const component = this.principal.dynamicComponent
    const entityIdentification = formStoreRegistry.EntityIdentification
    const formClass = new formClassRegistry[component]

    await formClass.validate()
    await formClass.save()
    formClass.reset()
  }
}
