import { Mediator } from './Mediator'
import { NotifyType } from 'src/constants/Interfaces'

export class BaseComponent {
  protected mediator: Mediator
  constructor(mediator?: Mediator) {
    this.mediator = mediator!
  }

  setMediator(mediator: Mediator) {
    this.mediator = mediator
  }
}

export class HandleRoutes extends BaseComponent {
  onAction: NotifyType = (groupEvent, specificEvent, sender): void => {
    this.mediator.notify(groupEvent, specificEvent, sender)
  }
}