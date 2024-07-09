import { NotifyType, SpecificsForGroups } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { BaseComponent } from './Components'
import { GeneralDirector } from './Director'
import { useQuasar } from 'quasar'
import { useEntityIdentification } from 'src/stores/principal'

export interface Mediator {
  notify: NotifyType
  setDirector: (director: GeneralDirector) => void
  setComponent: (component: BaseComponent) => void
}

export class AppMediator implements Mediator {
  director!: GeneralDirector
  $q
  entity
  constructor() {
    this.$q = useQuasar()
    this.entity = useEntityIdentification()
  }

  setDirector(director: GeneralDirector): void {
    this.director = director
  }

  setComponent(component: BaseComponent) {
    component.setMediator(this)
  }

  notify: NotifyType = async (groupEvent, specificEvent, sender) => {
    try {
      switch (groupEvent) {
        case 'LOAD_DYNAMIC_COMPONENT':
          await this.director.loadComponent(specificEvent as SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>, FormEnvironment)
          console.log(groupEvent, specificEvent, sender, ' Hola desde mediator')
          break
        case 'ACTION_BUTTON':
          switch (specificEvent as SpecificsForGroups<'ACTION_BUTTON'>) {
            case 'ShowTree':
              this.director.showTree(sender)
              break
            case 'Save':
              this.director.save()
              break
            case 'Check':
              this.director.check()
              break
            case 'Close':
              this.director.changeCardStatus()
              break
          }
          break
        case 'GENERALS_FILTERS':
          switch (specificEvent as SpecificsForGroups<'GENERALS_FILTERS'>) {
            case 'Municipality':
              const result = await this.director.filterfn(sender, 'Municipality')
              this.entity.optMunicipios = result as []
              console.log(result)
              break
            case 'Entity': {
              const { val, update, id } = sender
              this.entity.optEntidades = await this.director.filterfn({ val, update }, 'Entity', id) as []
              console.log(sender)
              break
            }
            case 'Address': {
              const { val, update, id } = sender
              console.log(sender)
              this.entity.optDirecciones = await this.director.filterfn({ val, update }, 'Address', id) as []
              break
            }
          }
        default:
          break
      }
    } catch (error) {
      console.error(error)
      let errorMessage = 'Error desconocido';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        errorMessage = String(error);
      }

      this.$q.dialog({
        title: 'Ups!',
        message: errorMessage
      })
    }
  }
}
