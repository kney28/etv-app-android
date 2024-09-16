import { FormActions, DataInsert } from 'src/constants/Interfaces'
import { Store } from 'pinia';
import { useFAMA29 } from 'src/stores/F-AM-A-29'
import { useGeneralities, useEntityIdentification, usePrincipal } from 'src/stores/principal'
import { GeneralForms } from 'src/components/Form.module'
import { uid } from 'quasar'

export class Form extends GeneralForms implements FormActions {
  fama29: Store<'fama29', { [key: string]: any; }>
  generalities: Store<'generalities', { [key: string]: any; }>
  entity: Store<'entityIdentification', { [key: string]: any; }>
  principal: Store<'principal', { [key: string]: any; }>
  aspects: any[]
  constructor() {
    super()
    this.fama29 = {} as Store<'fama29', { [key: string]: any; }>
    this.generalities = {} as Store<'generalities', { [key: string]: any; }>
    this.entity = {} as Store<'entityIdentification', { [key: string]: any; }>
    this.principal = {} as Store<'principal', { [key: string]: any; }>
    this.aspects = []
  }

  setStores() {
    this.fama29 = useFAMA29()
    this.generalities = useGeneralities()
    this.entity = useEntityIdentification()
    this.principal = usePrincipal()
    this.aspects = [
      () => this.validateAspect(this.fama29.aspect1),
      () => this.validateAspect(this.fama29.aspect2),
      () => this.validateAspect(this.fama29.aspect3),
      () => this.validateAspect(this.fama29['aspect4.1']),
      () => this.validateAspect(this.fama29['aspect4.2']),
      () => this.validateAspect(this.fama29['aspect4.3']),
      () => this.validateAspect(this.fama29['aspect4.4']),
      () => this.validateAspect(this.fama29.aspect5),
      () => this.validateSanitaryRequirements(this.generalities, this.fama29),
      () => this.validateReasonVisitModified(this.generalities, this.fama29),
      () => this.validateSanitaryMeasureModified(this.generalities, this.fama29),
      () => this.validateCompilanceDeadline(this.generalities, this.fama29)
    ]
  }

  validateReasonVisitModified(store1: Store<'generalities', { [key: string]: any }>, store2: Store<'fama29', { [key: string]: any; }>) {
    const radioIsValid = store1.motivoVisita !== null && store1.motivoVisita !== 'OTRO' && store1.motivoVisita !== 'INTERESADO' && store1.motivoVisita !== 'QUEJAS-RECLAMOS'
    const inputIsValid = (store1.motivoVisita === 'OTRO' && store1.motivoVisitaEsp !== 'INTERESADO' && store1.motivoVisitaEsp !== 'QUEJAS-RECLAMOS') && (store1.motivoVisitaEsp !== '' && store1.motivoVisitaEsp !== null)
    const codeFiledRadio = store1.motivoVisita === 'INTERESADO' || store1.motivoVisita === 'QUEJAS-RECLAMOS'
    const codeFiledInput = codeFiledRadio && (store2.codeFiled !== '' && store2.codeFiled !== null)
    const result = radioIsValid || inputIsValid || codeFiledInput

    console.log(result, radioIsValid, inputIsValid, codeFiledInput, store1.motivoVisita)

    return { status: result, message: !result ? 'Complete los campos' : '' }
  }

  validateSanitaryMeasureModified(store1: Store<'generalities', { [key: string]: any }>, store2: Store<'fama29', { [key: string]: any; }>) {
    const radioIsValid = store1.medidaSanitaria === 'Sí'
    const inputIsValid = store1.medidaSanitaria === 'Sí' && (store2.typeSanitaryMeasure.typeValue !== '' && store2.typeSanitaryMeasure.typeValue !== null && store2.typeSanitaryMeasure.actNumber !== '' && store2.typeSanitaryMeasure.actNumber !== null)
    const result = (radioIsValid && inputIsValid) || store1.medidaSanitaria === 'No'

    console.log(result, radioIsValid, inputIsValid)
    return { status: result, message: !result ? 'Digite el N° del acta y seleccione un motivo' : '' }
  }

  validateCompilanceDeadline(store1: Store<'generalities', { [key: string]: any }>, store2: Store<'fama29', { [key: string]: any }>) {
    const sanitaryMeasure = store1.medidaSanitaria === 'Sí'
    console.log(`Medida: ${sanitaryMeasure}. Days: ${store2.diasHabilesPlazo}. From: ${store2.fechasPlazo?.from}. To: ${store2.fechasPlazo?.to}`)
    let message = ''
    if (sanitaryMeasure) {
      if (!store2.diasHabilesPlazo) {
        message = 'Complete el campo "Días hábiles del plazo"'
      } else if (!store2.fechasPlazo.from) {
        message = 'Complete el campo "Fecha desde"'
      } else if (!store2.fechasPlazo.to) {
        message = 'Complete el campo "Fecha hasta"'
      }
    }

    const result = !sanitaryMeasure || (!!store2.diasHabilesPlazo && !!store2.fechasPlazo.from && !!store2.fechasPlazo.to)

    if (!result && message === '') {
      message = 'Complete los campos ya que existe una medida sanitaria'
    }

    return { status: result, message }
  }

  getAspectsAndScores(): Record<string, any> {
    const aspectosYClasificaciones: Record<string, any> = {};

    const aspectos = ['aspect1', 'aspect2', 'aspect3', 'aspect4.1', 'aspect4.2', 'aspect4.3', 'aspect4.4', 'aspect5']
    aspectos.forEach((aspecto, i) => {
      this.fama29[aspecto].forEach((item: { cr: boolean, value: number | null, observations: null | string, na: boolean }, index: number) => {
        aspectosYClasificaciones[`${aspecto}.${index + 1}`] = {
          cr: item.cr, value: item.value, observations: item.observations, na: item?.na ?? false
        }
      })
      aspectosYClasificaciones[`clasificacionBlq${i + 1}`] = this.fama29.scoreAspect(aspecto)
    })

    return aspectosYClasificaciones
  }

  /**
   * Aplana los aspectos y clasificaciones obtenidos de getAspectsAndScores en un objeto lineal.
   *
   * @return {Record<string, any>} Un objeto lineal que contiene los aspectos y clasificaciones aplanados.
   */
  flattenAspectsAndScores(): Record<string, any> {
    const aspectosYClasificaciones = this.getAspectsAndScores()
    const aspectosLineales: Record<string, any> = {}

    Object.keys(aspectosYClasificaciones).forEach((key) => {
      const value = aspectosYClasificaciones[key]

      if (typeof value === 'object' && value !== null) {
        // Aplana las propiedades de los objetos
        Object.keys(value).forEach((subKey) => {
          aspectosLineales[`${key}.${subKey}`] = value[subKey]
        })
      } else {
        // Si no es un objeto, simplemente lo copia al resultado final
        aspectosLineales[key] = value
      }
    })

    return aspectosLineales
  }

  flattenDocumentaryReview(): Record<string, any> {
    const documentaryReview = this.fama29.documentaryReview
    const flatReview: Record<string, any> = {}

    documentaryReview.forEach((item: { title: string, value: string, observations: string, labelInput: string }, index: number) => {
      flatReview[`documentaryReview.${index + 1}.title`] = item.title
      flatReview[`documentaryReview.${index + 1}.value`] = item.value
      flatReview[`documentaryReview.${index + 1}.observations`] = item.observations
      flatReview[`documentaryReview.${index + 1}.labelInput`] = item.labelInput
    })
    return flatReview
  }

  async save(userName: string, GPS: { [key: string]: any }): Promise<DataInsert> {
    const date = this.entity.fechaRealizacion.split('/')
    return {
      id: uid(),
      identificadorEntrevista: 'F-AM-A-29',
      versionEntrevista: '2.0',
      usuarioEntrevistador: userName,
      idEstablecimiento: this.entity.direccion,
      gps: GPS.coords,
      timestamp: GPS.timestamp,
      fecha: date[2] + '/' + date[1] + '/' + date[0],
      motivoVisita: this.generalities.motivoVisita,
      motivoVisitaOtroTexto: this.generalities.motivoVisitaEsp,
      numeroRadicado: this.fama29.codeFiled,
      ...this.flattenDocumentaryReview(),
      ...this.flattenAspectsAndScores(),
      puntajeConceptoSanitario: this.fama29.score,
      conceptoSanitario: this.fama29.emitConcept,
      muestrasTomadas: this.generalities.muestrasTomadas,
      actaTomaMuestras: this.generalities.actaTomaMuestras,
      requerimientosSanitarios: this.generalities.requerimientosSanitarios,
      obsMedidaSanitaria: this.generalities.obsMedidaSanitaria,
      obsAutoridadSanitaria: this.generalities.obsAutoridadSanitaria,
      obsEstablecimiento: this.generalities.obsEstablecimiento,
      medidaSanitaria: this.generalities.medidaSanitaria,
      motivoMedidaSanitaria: this.fama29.typeSanitaryMeasure.typeValue,
      actaMedidaSanitaria: this.fama29.typeSanitaryMeasure.actNumber,
      diasHabilesPlazo: this.fama29.diasHabilesPlazo,
      fechaInicioPlazo: this.fama29.fechasPlazo?.from,
      fechaFinPlazo: this.fama29.fechasPlazo?.to
    }
  }

  resetValues(): void {
    this.fama29.resetValues()
    this.generalities.resetValues()
    this.entity.resetValues()
    console.log('resetValues FAMA29')
  }

  resetStore(): void {
    /** Varificamos si la Store tiene propiedades,
     * para evitar el error 'this.fama02.$reset is not a function'
     */
    const hasPropertys = Object.keys(this.fama29).length > 0
    if (!hasPropertys) return
    this.fama29.$reset()
  }

  validateAspect(aspect: any[] = [{ value: null, cr: false, literal: '' }]) {
    const result = aspect.find((item: { value: number | null, cr: boolean }) => {
      return item.value === null && item.cr === false
    })
    const isValid = result ? false : true
    return { status: isValid, message: !isValid ? `Complete el punto ${result.literal}` : '' }
  }

  validateSection2() {
    /** Cantidad de aspectos */
    const count = 5
    let result = true
    for (let i = 1; i <= count; i++) {
      if (i === 4) {
        for (let j = 1; j <= 4; j++) {
          result = result && this.validateAspect(this.fama29[`aspect4.${j}`]).status
        }
      } else {
        result = result && this.validateAspect(this.fama29[`aspect${i}`]).status
      }
    }

    return result
  }
  validateSection3Modified(store1: Store<'generalities', { [key: string]: any }>, store2: Store<'fama29', { [key: string]: any; }>) {
    const sanitaryMeasure = this.validateSanitaryMeasureModified(store1, store2).status
    const complianceDeadline = this.validateCompilanceDeadline(store1, store2).status
    const result = !!store1.muestrasTomadas && !!store1.actaTomaMuestras &&
      !!store1.medidaSanitaria && !!store1.obsAutoridadSanitaria &&
      !!store1.obsEstablecimiento && !!sanitaryMeasure && !!complianceDeadline

    return result
  }

  /* validateCompilanceDeadline(store1: Store<'generalities', { [key: string]: any }>, store2: Store<'fama29', { [key: string]: any; }>) {
  } */

  validateSectionByCardKey(cardKey: number): boolean {
    const validations = [
      () => this.validateSection1(this.entity, this.generalities),
      () => this.validateSection2(),
      () => /* Espacio para la tarjeta concepto */ true,
      () => this.validateSection3Modified(this.generalities, this.fama29)
    ]

    return validations[cardKey]()
  }

  async checkSectionStatus(currentForm: number) {
    return this.aspects[currentForm]()
  }
}

export const form = new Form()
