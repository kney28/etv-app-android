import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.3,
  aspect2: 0.7
}

export const useFAMA08 = defineStore('fama08', {
  state: () => ({
    aspect1: [
      {
        literal: '1.1',
        title: `Localización y diseño.
        (Resolución 2674/2013, Artículo 6,
        Numerales 1.1, 1.2, 1.3, 2.1, 2,3 y 2.6,;
        Artículo 32, Numerales 1, 2, 3, 4, 6 y
        7. Artículo 33, Numeral 8)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 10 },
          { label: 'AR', val: 5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.2',
        title: `Instalaciones sanitarias.
        (Resolución 2674/2013, Artículo 6,
        Numeral 6.1, 6.2, 6.3, 6.4; Artículo 32,
        Numeral 9 y 11.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 20 },
          { label: 'AR', val: 10 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect2: [
      {
        literal: '2.1',
        title: `Control Integral de plagas.
        (Resolución 2674/2013 Artículo 26,
        Numeral 3.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 30 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '2.2',
        title: `Suministro y calidad de agua potable.
        (Decreto 1575 de 2007. Artículo 10 Numeral 3.
        Resolución 2674/2013, Artículo 6, Numeral 3.1, 3.2, 3.3, 3.5.1, 3.5.2 y
        3.5.3, Artículo 26, Numeral 4. Resolución 2115 de 2007, Artículo 9).`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 15 },
          { label: 'AR', val: 7.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '2.3',
        title: `Manejo de residuos sólidos y líquidos.
        (Ley 9 de 1979. Artículo 23.
        Resolución 2674 de 2013 Art 6 núm.
        4.1,4.2, 5.1, 5.2, 5.3. Art.31 numerales
        1 y 2. )`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 10 },
          { label: 'AR', val: 5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '2.4',
        title: `Limpieza y desinfección.
        (Resolución 2674/2013. Artículo 26
        Numeral 1)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 10 },
          { label: 'AR', val: 5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '2.5',
        title: `Soporte documental de saneamiento.
        (Decreto 1575 de 2007, Artículo 10.
        Resolución 2674/2013
        Artículo 26).`,
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
      const aspects: string[] = ['aspect1', 'aspect2'];
      const totalScore = aspects.reduce((total, aspect) => {
        const sum = state[aspect].reduce((acc: number, item: { value: number | null }) => acc + (item.value ?? 0), 0);
        return total + sum * weighting[aspect];
      }, 0);
      const scale = 58 // la escala esta dada por el puntaje maximo posible en porcentaje
      return (totalScore * 100) / scale;
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
          return total + value;
        }, 0)
      }
    }
  },
  actions: {
    resetValues() {
      const aspectos = ['aspect1', 'aspect2']
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
