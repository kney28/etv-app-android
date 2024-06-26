import { NotifyType, SpecificsForGroups } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { BaseComponent } from './Components'
import { GeneralDirector } from './Director'
import { useQuasar } from 'quasar'

export interface Mediator {
  notify: NotifyType
  setDirector: (director: GeneralDirector) => void
  setComponent: (component: BaseComponent) => void
}

export class AppMediator implements Mediator {
  director!: GeneralDirector
  $q
  constructor() {
    this.$q = useQuasar()
  }

  setDirector(director: GeneralDirector): void {
    this.director = director
  }

  setComponent(component: BaseComponent) {
    component.setMediator(this)
  }

  notify: NotifyType = (groupEvent, specificEvent, sender) => {
    try {
      switch (groupEvent) {
        case 'LOAD_DYNAMIC_COMPONENT':
          this.director.loadComponent(specificEvent as SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>, FormEnvironment)
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
              this.director.filterfn(sender, 'Municipality')
              break
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
