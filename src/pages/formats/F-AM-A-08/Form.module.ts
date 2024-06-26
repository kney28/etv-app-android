import { FormActions } from 'src/constants/Interfaces'

export class Form implements FormActions {
  async validate(): Promise<boolean> {
    console.log('validate', true)
    return true
  }

  async save(): Promise<void> {
    console.log('save')
  }

  reset(): void {
    console.log('reset')
  }

  async checkSectionStatus(currentForm: number) {
    return { status: true, message: '' }
  }
}

export const form = new Form()


