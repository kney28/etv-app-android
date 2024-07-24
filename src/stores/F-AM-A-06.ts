import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.18,
  aspect2: 0.15,
  aspect3: 0.15,
  aspect4: 0.18,
  aspect5: 0.34
}

export const useFAMA06 = defineStore('fama06', {
  state: () => ({
    aspect1: [
      {
        literal: '1.1',
        title: `Localización y alrededores.
        (Resolución 604 de 1993, Art.1;
        2b; 14; 18; 19; 40 Resolución 2674 de 2013, Art.
        6. Numeral 1.1; 1.3, Art. 31 Numeral 1; 2.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 7 },
          { label: 'AR', val: 3.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.2',
        title: `Estructura física y condiciones de mantenimiento.
        (Resolución 2674/2013, Artículo 7, Numeral 1, 2.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 6 },
          { label: 'AR', val: 3 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.3',
        title: `Acceso a Servicio sanitario.
        (Resolución 2674/2013, Artículo 7, Numerales
        3, 4, 5.1, 7, 8. )`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 5 },
          { label: 'I', val: 0 }
        ]
      },
    ],
    aspect2: [
      {
        literal: '2.1',
        title: `Equipos y utensilios.
        (Resolución 604 de 1993 Art. 16;26; 28; 29. Resolución 2674 de 2013 Art.
        8; 9 Numeral 1; 3; 4; 7 Art 31 Numeral 1; 2; 3.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 7 },
          { label: 'AR', val: 3.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '2.2',
        title: `Superficies de contacto con el alimento.
        (Resolución 2674/2013, Artículo 8; Artículo 9, Numerales 1, 2, 3,
        4, 7, 9 y 10; Artículo 34. Artículo 35, Numeral 8 y 10.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 8 },
          { label: 'AR', val: 4 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect3: [
      {
        literal: '3.1',
        title: `Estado de salud y reconocimiento médico.
        (Resolución 604 de 1993 Art. 7 Resolución 2674 de 2013
        Art.11; Art. 14 Numeral 11.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 5 },
          { label: 'AR', val: 2.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '3.2',
        title: `Presentación personal y prácticas higiénicas.
        (Resolución 604 de 1993 Art. 3; 4; 5; 6; 8
        Res 2674 de 2013 Art. 14 Numeral 1; 2; 4; 11.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 5 },
          { label: 'AR', val: 2.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '3.3',
        title: `Capacitación en manipulación higiénica de alimentos.
        (Resolución 604 de 1993 Art. 9
        Resolución 2674 de 2013 Art. 12.)`,
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
    ],
    aspect4: [
      {
        literal: '4.1',
        title: `Manejo, conservación, almacenamiento y venta de productos.
        (Resolución 604 de 1993. Art. 24; 25; 26; 33.
        Resolución 2674 de 2013 Art. 6 Numeral 2.9; Art.16; 27; Art. 28
        Numeral 3; 4. Art.31 Numeral 1, 2, 3, 4 parágrafo 2; Art. 35
        Numeral 1; 4; 6.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 9 },
          { label: 'AR', val: 4.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '4.2',
        title: `Operaciones de preparación y servido de alimentos.
        (Resolución 604 de 1993. Art. 26; 30; 31; 32; 34; 35; 36.
        Resolución 2674 Art. 31; 35 numeral 2, 3,4, 7, 10.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 9 },
          { label: 'AR', val: 4.5 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect5: [
      {
        literal: '5.1',
        title: `Suministro, utilización y manejo del agua potable.
        (Resolución 604 de 1993 Art.15; 20; 21. Resolución 2674 de 2013, Art.
        6 Numeral 3.1., Art. 31 Numeral 1; 2., Art. 32 numeral 8.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 9 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '5.2',
        title: `Residuos líquidos.
        (Resolución 604 de 1993 Art. 15; 23
        Resolución 2674 de 2013 Art 6 Numeral 4.1; 4.2. Art.31
        Numeral 1; 2., Art. 32 numeral 5, 6.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 6 },
          { label: 'AR', val: 3 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '5.3',
        title: `Residuos sólidos.
        (Resolución 604 de 1993 Art. 15; 22
        Resolución 2674 de 2013 Art 6 Numeral 5.1; 5.2., Art.31
        Numeral 1 y 2., Art. 32 numeral 6.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 5 },
          { label: 'AR', val: 2.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '5.4',
        title: `Control de plagas.
        (Resolución 2674 de 2013 Art 26 Numeral 3. Art. 31 Numeral
        1; 2., Art. 32 numeral 7.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 7 },
          { label: 'AR', val: 3.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '5.5',
        title: `Limpieza y desinfección.
        (Resolución 604 de 1993 Art.13; 17; 19; 28; 29; 34.
        Resolución 2674 de 2013 Art. 6 Numeral 2.4, Art.31 Numeral 1; 2.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 7 },
          { label: 'AR', val: 3.5 },
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
      const scale = 22.54  // la escala esta dada por el puntaje maximo posible en porcentaje
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
