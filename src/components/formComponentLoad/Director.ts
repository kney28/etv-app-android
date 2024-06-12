import { usePrincipal } from 'src/stores/principal'
import { useRouter } from 'vue-router'
import { PagesList, SpecificsForGroups } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'

export interface GeneralDirector {
  loadComponent: (componentName: PagesList, environment: typeof FormEnvironment) => void
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
      const { nodes } = await environment[componentName]()
      this.principal.nodes = nodes
      console.log(this.principal.nodes)
      this.$router.push({ name: 'F-EV-04' })
    } catch (e) {
      throw e
    }
  }
}