import { NotifyType, SpecificsForGroups } from 'src/constants/Interfaces'
import { FormEnvironment } from 'src/modules/FormEnvironment'
import { BaseComponent } from './Components'
import { GeneralDirector } from './Director'

export interface Mediator {
  notify: NotifyType
}

export class FormInitComponent implements Mediator {
  protected director!: GeneralDirector

  constructor(c1: BaseComponent) {
    c1.setMediator(this)
  }
  setDirector(director: any): void {
    this.director = director
  }
  notify: NotifyType = (groupEvent, specificEvent, sender) => {
    try {
      switch (groupEvent) {
        case 'LOAD_DYNAMIC_COMPONENT':
          this.director.loadComponent(specificEvent as SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>, FormEnvironment)
          console.log(sender, ' Hola desde mediator')
          break
        default:
          break
      }
    } catch (error) {
      console.error(error)
    }
  }
}