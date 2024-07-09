import { FormActions, DataInsert } from 'src/constants/Interfaces'
import { GeneralForms } from 'src/components/Form.module'
import { uid } from 'quasar'

export class Form extends GeneralForms implements FormActions {
  setStores(): void {
    const initial = 0
  }

  async save(userName: string, GPS: { [key: string]: any }): Promise<DataInsert> {
    console.log('save')
    return {
      id: uid(),
      identificadorEntrevista: 'F-AM-A-08'
    }
  }

  resetValues(): void {
    console.log('reset initial')
  }

  resetStore(): void {
    console.log('reset initial')
  }

  validateSectionByCardKey(cardKey: number): boolean {
    return true
  }

  async checkSectionStatus(currentForm: number) {
    return { status: true, message: '' }
  }
}

export const form = new Form()


