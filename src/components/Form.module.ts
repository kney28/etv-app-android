import { Store } from 'pinia';

export class GeneralForms {
  async validate(): Promise<boolean> {
    console.log('validate', true)
    return true
  }

  /* reset(): void {
    console.log('reset')
  } */

  validateSanitaryMeasure(store: Store<'generalities', { [key: string]: any }>) {
    const radioIsValid = store.medidaSanitaria === 'Sí'
    const inputIsValid = store.medidaSanitaria === 'Sí' && (store.obsMedidaSanitaria !== '' && store.obsMedidaSanitaria !== null)
    const result = (radioIsValid && inputIsValid) || store.medidaSanitaria === 'No'

    console.log(result, radioIsValid, inputIsValid)
    return { status: result, message: !result ? 'Complete los campos' : '' }
  }

  validateReasonVisit(store: Store<'generalities', { [key: string]: any }>) {
    const radioIsValid = store.motivoVisita !== null && store.motivoVisita !== 'OTRO'
    const inputIsValid = store.motivoVisita === 'OTRO' && (store.motivoVisitaEsp !== '' && store.motivoVisitaEsp !== null)
    const result = radioIsValid || inputIsValid

    console.log(result, radioIsValid, inputIsValid, store.motivoVisita)

    return { status: result, message: !result ? 'Complete los campos' : '' }
  }

  validateSanitaryRequirements(
    store1: Store<'generalities', { [key: string]: any }>,
    store2: Store<any, { [key: string]: any; }>
  ) {
    const concept = store2.emitConcept !== 'Favorable con requerimientos'
    console.log(store2.emitConcept)
    const inputIsValid = !concept && (store1.requerimientosSanitarios !== '' && store1.requerimientosSanitarios !== null)
    const result = concept || inputIsValid

    console.log(result, concept, inputIsValid, store1.requerimientosSanitarios)

    return { status: result, message: !result ? 'Debe indicar cuantos días se conceden' : '' }
  }

  /**
   * Esta validacion es utilizada por el componente cardGroup para cambiar
   * el icono dependiendo de un estado finalizado o pendiente
   */
  validateSection1(
    store1: Store<'entityIdentification', { [key: string]: any }>,
    store2: Store<'generalities', { [key: string]: any; }>
  ) {
    const radioIsValid = store2.motivoVisita !== null && store2.motivoVisita !== 'OTRO'
    const inputIsValid = store2.motivoVisita === 'OTRO' && (store2.motivoVisitaEsp !== '' && store2.motivoVisitaEsp !== null)

    const result = !!store1.fechaRealizacion && !!store1.municipio &&
      !!store1.establecimiento && !!store1.direccion &&
      !!store1.email && !!store2.motivoVisita && (radioIsValid || inputIsValid)
    console.log({
      fechaRealizacion: store1.fechaRealizacion,
      municipio: !!store1.municipio,
      establecimiento: !!store1.establecimiento,
      direccion: !!store1.direccion,
      email: !!store1.email,
      motivoVisita: !!store2.motivoVisita,
    })
    return result
  }

  validateSection3(store: Store<'generalities', { [key: string]: any }>) {
    const result = !!store.muestrasTomadas && !!store.actaTomaMuestras &&
      !!store.medidaSanitaria && !!store.obsAutoridadSanitaria &&
      !!store.obsEstablecimiento

    return result
  }
}

export const form = new GeneralForms()
