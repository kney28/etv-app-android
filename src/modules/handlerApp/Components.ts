import { Mediator } from './Mediator'
import { NotifyForGroup, SpecificsForGroups } from 'src/constants/Interfaces'

export class BaseComponent {
  protected mediator!: Mediator
  /* constructor(mediator: Mediator) {
    this.mediator = mediator
  } */

  setMediator(mediator: Mediator) {
    this.mediator = mediator
  }
}

/* export class MenuHandler extends BaseComponent {
  onAction: NotifyType = (groupEvent, specificEvent, sender): void => {
    this.mediator.notify(groupEvent, specificEvent, sender)
  }
} */

export class MenuHandler extends BaseComponent {
  onAction: NotifyForGroup<'LOAD_DYNAMIC_COMPONENT'> = (specificEvent: SpecificsForGroups<'LOAD_DYNAMIC_COMPONENT'>): void => {
    console.log(specificEvent)
    this.mediator.notify('LOAD_DYNAMIC_COMPONENT', specificEvent, null)
  }
}

export class ButtonHandler extends BaseComponent {
  onAction: NotifyForGroup<'ACTION_BUTTON'> = (specificEvent: SpecificsForGroups<'ACTION_BUTTON'>, sender: any): void => {
    this.mediator.notify('ACTION_BUTTON', specificEvent, sender)
  }
}