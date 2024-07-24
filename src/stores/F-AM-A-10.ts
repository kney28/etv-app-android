import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.12,
  aspect2: 0.12,
  aspect3: 0.36,
  aspect4: 0.15,
  aspect5: 0.25
}

export const useFAMA10 = defineStore('fama10', {
  state: () => ({
    aspect1: [
      {
        literal: '1.1',
        title: `Diseño sanitario del vehículo.
        (Decreto 561 de 1984, Art. 98. Decreto 2278/1982 Art. 365,
        367,368,369 y 373. Decreto 616 de 2006 Art.57, Art. 58 y
        Art. 59. Resol. 2674/2013. Art. 29, Núm. 5 y 9.
        Resol. 2505/2004. Art. 4.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 12 },
          { label: 'AR', val: 6 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect2: [
      {
        literal: '2.1',
        title: `Condiciones de los utensilios.
        (Decreto 561 de 1984, Art. 98. Decreto 2278/1982 Art. 366 y 368.
        Resolución 2505 de 2004, Art. 4. Resol. 2674/2013. Art. 29, Núm. 1 y 5.
        Art. 9, Núm. 1, 2. Resoluciones 683, 4142 y 4143 de
        2012; 834 y 835 de 2013.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 12 },
          { label: 'AR', val: 6 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect3: [
      {
        literal: '3.1',
        title: `Estado de salud.
        (Resol. 2674/2013. Art. 11, Núm. 5. Art. 14, Núm. 12.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 13 },
          { label: 'AR', val: 6.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '3.2',
        title: `Reconocimiento médico.
        (Resolución 2674 de 2013, Artículo 11, Numeral 1, 2, 3, 4)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 4 },
          { label: 'AR', val: 2 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '3.3',
        title: `Prácticas higiénicas.
        (Resolución 2674/2013, Artículo 14, Numerales 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 13 y 14. Artículo 36. Artículo 35, Numeral 5 y 7.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 13 },
          { label: 'AR', val: 6.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '3.4',
        title: `Educación y capacitación.
        (Resolución 2674/2013, Artículos 12 y 13. Artículo 36.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 6 },
          { label: 'AR', val: 3 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect4: [
      {
        literal: '4.1',
        title: `Limpieza del vehículo.
        (Resolución 2674/2013. Art. 29, Núm. 4 y 5.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 15 },
          { label: 'AR', val: 7.5 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect5: [
      {
        literal: '5.1',
        title: `Condiciones de conservación del producto.
        (Decreto 2278/1982 Art. 368, 369, 373.
        Decreto 561 de 1984, Art. 89, 97, 98, 99.
        Resol. 2674/2013. Art. 29, Núm. 6, 7,
        8. Art. 30, Parágrafo 1 y 2.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 20 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '5.2',
        title: `Empaque, Rotulado y vida útil.
        (Decreto 561 de 1984, Art. 73. Decreto 5109 de 2005.
        Resol. 2674/2013. Art. 19, Numeral 2. Art. 29, Núm. 1.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 5 },
          { label: 'AR', val: 2.5 },
          { label: 'I', val: 0 }
        ]
      }
    ]
  }),
  getters: {
    /**
     * Calcula la puntuación total basada en el estado del almacén.
     *
     * @param {object} state - El estado del almacén.
     * @returns {number} La puntuación total.
     */
    score(state: { [key: string]: any }): number {
      const aspects: string[] = ['aspect1', 'aspect2', 'aspect3', 'aspect4', 'aspect5']
      const totalScore = aspects.reduce((total, aspect) => {
        const sum = state[aspect].reduce((acc: number, item: { value: number | null }) => acc + (item.value ?? 0), 0)
        return total + sum * weighting[aspect]
      }, 0)
      const scale = 24.34  // la escala esta dada por el puntaje maximo posible en porcentaje
      return Number(((totalScore * 100) / scale).toFixed(2))
    },
    /**
     * Calcula el concepto basado en la puntuación de la tienda.
     *
     * @return {string} El concepto basado en la puntuación:
     *   - 'Favorable' si la puntuación está entre 90 y 100 (inclusive).
     *   - 'Favorable con requerimientos' si la puntuación está entre 60 y 89.9.
     *   - 'Desfavorable' si la puntuación es menor que 59.9.
     *   - Lanza un error si la puntuación no está dentro del rango esperado.
     */
    emitConcept(): string {
      const score = this.score
      const { hasCriticalPoints } = usePrincipal()
      if (score >= 90 && score <= 100 && !hasCriticalPoints) {
        return 'Favorable'
      } else if (score >= 60 && score < 89.9 && !hasCriticalPoints) {
        return 'Favorable con requerimientos'
      } else if (score < 59.9 || hasCriticalPoints) {
        return 'Desfavorable'
      } else {
        throw new Error('Error en la puntuación')
      }
    },
    scoreAspect: (state) => {
      /**
       * Calcula la puntuación total basada en el estado de la tienda para un aspecto dado.
       * @param {string} aspect - El aspecto para el cual calcular la puntuación.
       * @return {number} La puntuación total para el aspecto dado.
       */
      return (aspect: string): number => {
        return state[aspect].reduce((total: number, { value }: { value: number }) => {
          return total + value
        }, 0)
      }
    }
  },
  actions: {
    resetValues() {
      const aspectos = ['aspect1', 'aspect2', 'aspect3', 'aspect4', 'aspect5']
      for (let i = 0; i < aspectos.length; i++) {
        this[aspectos[i]].forEach((item: { cr: boolean, value: number | null, observations: null | string, na: boolean }) => {
          item.cr = false
          item.value = null
          item.observations = null
          const hasNa = item.hasOwnProperty('na')
          if (hasNa) item.na = false
        })
      }
    }
  }
})
