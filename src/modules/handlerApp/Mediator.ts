import { NotifyType, SpecificsForGroups } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { BaseComponent } from './Components'
import { GeneralDirector } from './Director'

export interface Mediator {
  notify: NotifyType
  setDirector: (director: GeneralDirector) => void
  setComponent: (component: BaseComponent) => void
}

export class AppMediator implements Mediator {
  protected director!: GeneralDirector

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
          }
          break
        default:
          break
      }
    } catch (error) {
      console.error(error)
    }
  }
}
