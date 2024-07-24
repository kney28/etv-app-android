import { FormActions, DataInsert } from 'src/constants/Interfaces'
import { Store } from 'pinia';
import { useFAMA01 } from 'src/stores/F-AM-A-01'
import { useGeneralities, useEntityIdentification } from 'src/stores/principal'
import { GeneralForms } from 'src/components/Form.module'
import { uid } from 'quasar'

export class Form extends GeneralForms implements FormActions {
  fama01: Store<'fama01', { [key: string]: any; }>
  generalities: Store<'generalities', { [key: string]: any; }>
  entity: Store<'entityIdentification', { [key: string]: any; }>
  aspects: any[]
  constructor() {
    super()
    this.fama01 = {} as Store<'fama01', { [key: string]: any; }>
    this.generalities = {} as Store<'generalities', { [key: string]: any; }>
    this.entity = {} as Store<'entityIdentification', { [key: string]: any; }>
    this.aspects = []
  }

  setStores() {
    this.fama01 = useFAMA01()
    this.generalities = useGeneralities()
    this.entity = useEntityIdentification()
    this.aspects = [
      () => this.validateAspect(this.fama01.aspect1),
      () => this.validateAspect(this.fama01.aspect2),
      () => this.validateAspect(this.fama01.aspect3),
      () => this.validateAspect(this.fama01.aspect4),
      () => this.validateAspect(this.fama01.aspect5),
      () => this.validateSanitaryMeasure(this.generalities),
      () => this.validateReasonVisit(this.generalities),
    ]
  }

  getAspectsAndScores(): Record<string, any> {
    const aspectosYClasificaciones: Record<string, any> = {};

    const aspectos = ['aspect1', 'aspect2', 'aspect3', 'aspect4', 'aspect5']
    aspectos.forEach((aspecto, i) => {
      this.fama01[aspecto].forEach((item: { cr: boolean, value: number | null, observations: null | string, na: boolean }, index: number) => {
        aspectosYClasificaciones[`${aspecto}.${index + 1}`] = {
          cr: item.cr, value: item.value, observations: item.observations, na: item?.na ?? false
        }
      })
      aspectosYClasificaciones[`clasificacionBlq${i + 1}`] = this.fama01.scoreAspect(aspecto)
    })

    return aspectosYClasificaciones
  }

  async save(userName: string, GPS: { [key: string]: any }): Promise<DataInsert> {
    const date = this.entity.fechaRealizacion.split('/')
    return {
      id: uid(),
      identificadorEntrevista: 'F-AM-A-01',
      versionEntrevista: '3.0',
      usuarioEntrevistador: userName,
      idEstablecimiento: this.entity.direccion,
      gps: GPS.coords,
      timestamp: GPS.timestamp,
      Fecha: date[2] + '/' + date[1] + '/' + date[0],
      MotivoVisita: this.generalities.motivoVisita,
      MotivoVisitaOtroTexto: this.generalities.motivoVisitaEsp,
      ...this.getAspectsAndScores(),
      puntajeConceptoSanitario: this.fama01.score,
      conceptoSanitario: this.fama01.emitConcept,
      muestrasTomadas: this.generalities.muestrasTomadas,
      actaTomaMuestras: this.generalities.actaTomaMuestras,
      requerimientosSanitarios: this.generalities.requerimientosSanitarios,
      medidaSanitaria: this.generalities.medidaSanitaria,
      obsMedidaSanitaria: this.generalities.obsMedidaSanitaria,
      obsAutoridadSanitaria: this.generalities.obsAutoridadSanitaria,
      obsEstablecimiento: this.generalities.obsEstablecimiento
    }
  }

  resetValues(): void {
    this.fama01.resetValues()
    this.generalities.resetValues()
    this.entity.resetValues()
    console.log('resetValues FAMA01')
  }

  resetStore(): void {
    /** Varificamos si la Store tiene propiedades,
     * para evitar el error 'this.fama02.$reset is not a function'
     */
    const hasPropertys = Object.keys(this.fama01).length > 0
    if (!hasPropertys) return
    this.fama01.$reset()
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
      result = result && this.validateAspect(this.fama01[`aspect${i}`]).status
    }

    return result
  }

  validateSectionByCardKey(cardKey: number): boolean {
    const validations = [
      () => this.validateSection1(this.entity, this.generalities),
      () => this.validateSection2(),
      () => /* Espacio para la tarjeta concepto */ true,
      () => this.validateSection3(this.generalities),
    ]

    return validations[cardKey]()
  }

  async checkSectionStatus(currentForm: number) {
    return this.aspects[currentForm]()
  }
}

export const form = new Form()
