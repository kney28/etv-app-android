import { Store } from 'pinia';

export class GeneralForms {
  async validate(): Promise<boolean> {
    console.log('validate', true)
    return true
  }

  /* reset(): void {
    console.log('reset')
  } */

  validateSanitaryMeasure(store: Store<'generalities', { [key: string]: any; }>) {
    const radioIsValid = store.medidaSanitaria === 'Sí'
    const inputIsValid = store.medidaSanitaria === 'Sí' && (store.obsMedidaSanitaria !== '' && store.obsMedidaSanitaria !== null)
    const result = (radioIsValid && inputIsValid) || store.medidaSanitaria === 'No'

    console.log(result, radioIsValid, inputIsValid)
    return { status: result, message: !result ? `Complete los campos` : '' }
  }

  validateReasonVisit(store: Store<'generalities', { [key: string]: any; }>) {
    const radioIsValid = store.motivoVisita !== null && store.motivoVisita !== 'OTRO'
    const inputIsValid = store.motivoVisita === 'OTRO' && (store.motivoVisitaEsp !== '' && store.motivoVisitaEsp !== null)
    const result = radioIsValid || inputIsValid

    console.log(result, radioIsValid, inputIsValid, store.motivoVisita)

    return { status: result, message: !result ? `Complete los campos` : '' }
  }

  /**
   * Esta validacion es utilizada por el componente cardGroup para cambiar
   * el icono dependiendo de un estado finalizado o pendiente
   */
  validateSection1(store: Store<'entityIdentification', { [key: string]: any; }>) {
    const result = !!store.fechaRealizacion && !!store.municipio &&
      !!store.establecimiento && !!store.direccion &&
      !!store.email && !!store.motivoVisita && !!store.motivoVisitaEsp

    return result
  }

  validateSection3(store: Store<'generalities', { [key: string]: any; }>) {
    const result = !!store.muestrasTomadas && !!store.actaTomaMuestras &&
      !!store.medidaSanitaria && !!store.obsAutoridadSanitaria &&
      !!store.obsEstablecimiento

    return result
  }
}

export const form = new GeneralForms()
