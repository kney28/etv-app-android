import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.10,
  aspect2: 0.12,
  aspect3: 0.20,
  aspect4: 0.25,
  aspect5: 0.33
}

export const useFAMA01 = defineStore('fama01', {
  state: () => ({
    aspect1: [
      {
        literal: '1.1',
        title: `Localización y diseño.
        (Resolución 2674/2013, Artículo 6, Numerales 1.1, 1.2, 1.3,
        2.1, 2,3 y 2.6,; Artículo 32, Numerales 1, 2, 3, 4, 6 y 7. Artículo
        33, Numeral 8)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 2 },
          { label: 'AR', val: 1 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.2',
        title: `Condiciones de pisos, paredes y drenajes.
        (Resolución 2674/2013, Artículo 7, Numeral 1, 2. Artículo 33,
        Numerales 1, 2 y 3.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 2 },
          { label: 'AR', val: 1 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.3',
        title: `Techos, iluminación y ventilación.
        (Resolución 2674/2013, Artículo 7,
        Numeral 3, 4, 5, 7, 8. Artículo 33,
        Numeral 4.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 2 },
          { label: 'AR', val: 1 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.4',
        title: `Instalaciones sanitarias.
        (Resolución 2674/2013, Artículo 6,
        Numeral 6.1, 6.2, 6.3, 6.4; Artículo
        32, Numeral 9 y 11.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 4 },
          { label: 'AR', val: 2 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect2: [
      {
        literal: '2.1',
        title: `Condiciones de equipos y utensilios.
        (Resolución 2674/2013, Artículo 8,
        Artículo 9, Numerales 1, 6, 8 y 9,
        Artículo 10, Numerales 2 y 3. Artículo 34.)`,
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
        literal: '2.2',
        title: `Superficies de contacto con el alimento.
        (Resolución 2674/2013, Artículo 8; Artículo 9, Numerales 2, 3,
        4, 5, 7 y 10; Artículo 34. Artículo 35, Numeral 8 y 10.
        Resoluciones 683, 4142 y 4143 de 2012; 834 y 835 de 2013)`,
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
    ],
    aspect3: [
      {
        literal: '3.1',
        title: `Estado de salud.
        (Resolución 2674/2013, Artículo
        11; Numeral 1, 2, 4, 5. Artículo 14,
        Numeral 12.)`,
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
        literal: '3.2',
        title: `Reconocimiento médico.
        (Resolución 2674 de 2013, Artículo 11, Numeral 1, 2, 3, 4)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 2 },
          { label: 'AR', val: 1 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '3.3',
        title: `Prácticas higiénicas.
        (Resolución 2674/2013, Artículo 14,
        Numerales 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 13 y 14. Artículo 36. Artículo
        35, Numeral 5 y 7.)`,
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
        literal: '3.4',
        title: `Educación y capacitación.
        Resolución 2674/2013, Artículos
        12 y 13. Artículo 36.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 4 },
          { label: 'AR', val: 2 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect4: [
      {
        literal: '4.1',
        title: `Control de materias primas e insumos.
        (Decreto 561 de 1984, Art. 89. Resolución 2674/2013, Artículo
        16, Numerales 1, 3, 4 y 5 ; Artículo 35, Numerales 1, 2 y 3.
        Resolución 5109 de 2005. Resolución 1506 de 2011.
        Resoluciones 683, 4142 y 4143 de 2012; 834 y 835 de 2013.)`,
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
        literal: '4.2',
        title: `Prevención de la contaminación cruzada.
        (Resolución 2674/2013, Artículo 16, Numeral 7; Artículo 18,
        Numeral 7; Artículo 20, Numeral 5; Artículo 35, Numeral 4.)`,
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
        literal: '4.3',
        title: `Manejo de temperaturas.
        (Ley 9 de 1979, Artículo 293, 425.
        Resolución 2674/2013, Artículo 18, Numeral 3.1, 3.2, 3.3 y 5.)`,
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
        literal: '4.4',
        title: `Condiciones de almacenamiento.
        (Resoluciones 683/2012, 2674/2013 Artículo 16, Numeral 5 y
        6. Artículo 33, Numeral 9.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'A', val: 4 },
          { label: 'AR', val: 2 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect5: [
      {
        literal: '5.1',
        title: `Suministro y calidad de agua potable.
        (Resolución 2674/2013, Artículo 6, Numeral 3.1, 3.2, 3.3,
        3.5.1, 3.5.2 y 3.5.3, Artículo 26, Numeral 4. Artículo 32,
        Numeral 8. Resolución 2115 de 2007, Artículo 9. )`,
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
        literal: '5.2',
        title: `Residuos líquidos.
        (Resolución 2674/2013 Artículo 6, Numeral 4, Artículo 32,
        Numerales 5 y 10.)`,
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
        literal: '5.3',
        title: `Residuos sólidos.
        (Resolución 2674/2013 Artículo 6, Numerales 5.1, 5.2 y 5.3.
        Artículo 33, Numerales 5, 6 y 7. Artículo 18, Numeral 11.)`,
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
        literal: '5.4',
        title: `Control integral de plagas.
        (Resolución 2674/2013 Artículo 26, Numeral 3.)`,
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
        literal: '5.5',
        title: `Limpieza y desinfección de áreas, equipos y utensilios.
        (Resolución 2674/2013 Artículo 6 Numeral 6.5; Artículo 26 Numeral 1)`,
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
        literal: '5.6',
        title: `Soportes documentales de saneamiento.
        (Decreto 1575 de 2007, Artículo 10. Resolución 2674/2013
        Artículo 26.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 2 },
          { label: 'AR', val: 1 },
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
      const scale = 23.58 // la escala esta dada por el puntaje maximo posible en porcentaje
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
        throw new Error(`Error en la puntuación ${score}`)
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
