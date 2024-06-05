import { usePrincipal } from 'src/stores/principal'
import { useRouter } from 'vue-router'
// import { ref } from 'vue'

interface InitMap {
  [key: string]: () => Promise<any>
}

export class Director {
  principal
  $router
  constructor() {
    this.principal = usePrincipal()
    this.$router = useRouter()
  }
  async loadComponent(componentName: string, InitMap: InitMap) {
    try {
      const { nodes } = await InitMap[componentName]()
      this.principal.nodes = nodes
      console.log(this.principal.nodes)
      this.$router.push({ name: 'F-EV-04' })
    } catch (e) {
      throw e
    }
  }
}