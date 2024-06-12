import { defineStore } from 'pinia'
import { AppMediator } from 'src/modules/handlerApp/Mediator'
import { MenuHandler, ButtonHandler } from 'src/modules/handlerApp/Components'

interface MediatorState {
  mediator: AppMediator | null
  menuHandler: MenuHandler | null
  buttonHandler: ButtonHandler | null
}

export const useMediator = defineStore('mediator', {
  state: (): MediatorState => ({
    mediator: null,
    menuHandler: null,
    buttonHandler: null
  })
})
