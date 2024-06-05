import { InitMap } from './InitMap'
import { BaseComponent } from './Components'

export interface Mediator {
  notify: (event: string, sender: object | null) => void
}

export class FormInitComponent implements Mediator {
  director: any | null = null

  constructor(c1: BaseComponent) {
    c1.setMediator(this)
  }
  setDirector(director: any): void {
    this.director = director
  }
  notify(event: string, sender: object | null): void {
    try {
      switch (event) {
        case 'F-AM-1':
          this.director.loadComponent(event, InitMap)
          console.log(event, ' Hola desde mediator')
          break
        case 'F-AM-2':
          InitMap['F-AM-2']()
          break
        default:
          break
      }
    } catch (error) {
      console.error(error)
    }
  }
}