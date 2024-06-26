import { FormActions } from 'src/constants/Interfaces'
import { Store } from 'pinia';
import { useFAMA02 } from 'src/stores/F-AM-A-02'
import { useGeneralities, useEntityIdentification } from 'src/stores/principal'
import { GeneralForms } from 'src/components/Form.module'

export class Form extends GeneralForms implements FormActions {
  fama02: Store<'fama02', { [key: string]: any; }>
  generalities: Store<'generalities', { [key: string]: any; }>
  entity: Store<'entityIdentification', { [key: string]: any; }>
  aspects: any[]
  constructor() {
    super()
    this.fama02 = {} as Store<'fama02', { [key: string]: any; }>
    this.generalities = {} as Store<'generalities', { [key: string]: any; }>
    this.entity = {} as Store<'entityIdentification', { [key: string]: any; }>
    this.aspects = []
  }
  async validate(): Promise<boolean> {
    console.log('validate', true)
    return true
  }

  setStores() {
    this.fama02 = useFAMA02()
    this.generalities = useGeneralities()
    this.entity = useEntityIdentification()
    this.aspects = [
      () => this.validateAspect(this.fama02.aspect1),
      () => this.validateAspect(this.fama02.aspect2),
      () => this.validateAspect(this.fama02.aspect3),
      () => this.validateAspect(this.fama02.aspect4),
      () => this.validateAspect(this.fama02.aspect5),
      () => this.validateAspect(this.fama02.aspect6),
      () => this.validateSanitaryMeasure(this.generalities),
      () => this.validateReasonVisit(this.generalities)
    ]
  }

  async save(): Promise<void> {
    console.log('save')
  }

  reset(): void {
    console.log('reset')
  }

  validateAspect(aspect: any[]) {
    const result = aspect.find((item: { value: number | null, cr: boolean }) => {
      return item.value === null && item.cr === false
    })
    const isValid = result ? false : true
    return { status: isValid, message: !isValid ? `Complete el punto ${result.literal}` : '' }
  }

  validateSection2() {
    const count = 6
    let result = true
    for (let i = 1; i <= count; i++) {
      result = result && this.validateAspect(this.fama02[`aspect${i}`]).status
    }

    return result
  }

  /**
   * Valida una sección basada en la clave de la tarjeta proporcionada.
   *
   * @param {number} cardKey - La clave de la tarjeta a validar.
   * @return {boolean} El resultado de la validación.
   */
  validateSectionByCardKey(cardKey: number) {
    const validations = [
      () => this.validateSection1(this.entity),
      () => this.validateSection2(),
      () => /* Espacio para la tarjeta concepto */ true,
      () => this.validateSection3(this.generalities),
    ]

    return validations[cardKey]()
  }

  /* validateSanitaryMeasure() {
    const radioIsValid = this.generalities.medidaSanitaria === 'Sí'
    const inputIsValid = this.generalities.medidaSanitaria === 'Sí' && (this.generalities.obsMedidaSanitaria !== '' && this.generalities.obsMedidaSanitaria !== null)
    const result = (radioIsValid && inputIsValid) || this.generalities.medidaSanitaria === 'No'

    console.log(result, radioIsValid, inputIsValid)
    return { status: result, message: !result ? `Complete los campos` : '' }
  } */

  async checkSectionStatus(currentForm: number) {
    return this.aspects[currentForm]()
  }
}

export const form = new Form()
