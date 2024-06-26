import { defineStore } from 'pinia'
import { MediatorState } from 'src/constants/Interfaces'

export const useMediator = defineStore('mediator', {
  state: (): MediatorState => ({
    mediator: null,
    menuHandler: null,
    buttonHandler: null,
    filterHandler: null
  })
})
