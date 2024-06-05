import { Mediator } from './Mediator'

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
  onAction(event: string) {
    this.mediator.notify(event, null)
  }
}