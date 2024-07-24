import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.1,
  aspect2: 0.12,
  aspect3: 0.20,
  aspect4: 0.28,
  aspect5: 0.25,
  aspect6: 0.05
}

export const useFAMA03 = defineStore('fama03', {
  state: () => ({
    aspect1: [
      {
        literal: '1.1',
        title: `Localización y
        construcción.
        (Resolución 2674/2013,
        Art. 6, Numeral 1.1, 1.2,
        1.3, 2.1, 2,4 , 2.6 y 2,7.
        Art. 31 Numeral 1; 2.)`,
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
        (Resolución 2674/2013, Artículo 7, Numeral 1: 1.1,
        1.2, 1.4. Numeral 2: 2.1; 2,2; Art. 31 Numeral 1, 2.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 1.5 },
          { label: 'AR', val: 0.75 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.3',
        title: `Techos, puertas,
        iluminación y ventilación.
        (Resolución 2674/2013, Artículo 7, Numeral 3, 4, 5,
        7, 8. Art. 31 Numeral 1, 2.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 1.5 },
          { label: 'AR', val: 0.75 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.4',
        title: `Instalaciones sanitarias.
        (Resolución 2674/2013, Artículo 6, Numeral 6.1, 6.2,
        6.3, 6.4; Art. 31 Numeral 1, 2.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 3 },
          { label: 'AR', val: 1.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '1.5',
        title: `Áreas de exhibición y venta.
        (Resolución 2674 de 2013 Art. 6. Numeral 2.3; 2.5.
        Art. 31 Numeral 1; 2. )`,
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
    ],
    aspect2: [
      {
        literal: '2.1',
        title: `Capacidad, diseño y
        funcionamiento de equipos y utensilios.
        (Resolución 2674 de 2013 Art. 8, Art. 10 Numeral 2,3.
        Art. 18 numeral 3,1, 3,2 y 3.3. Art 31 Numeral 1; 2; 3 .)`,
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
        literal: '2.2',
        title: `Superficies de contacto con el alimento.
        (Resolución 2674/2013, Artículo 8; Artículo 9,
        Numerales 1, 2, 3, 4, 7, 9 y 10; Artículo 34. Artículo 35,
        Numeral 8 y 10. Resoluciones 683, 4142 y
        4143 de 2012; 834 y 835 de 2013.)`,
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
    aspect3: [
      {
        literal: '3.1',
        title: `Estado de salud aparente. (signos/lesiones)
        (Resolución 2674/2013, Artículo 11; Numeral 2, 5.
        Artículo 14, Numeral 12.)`,
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
        literal: '3.2',
        title: `Reconocimiento médico.
        (Resolución 2674 de 2013, Artículo 11, Numeral 1, 2, 3, 4)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 3 },
          { label: 'AR', val: 1.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '3.3',
        title: `Prácticas higiénicas y dotación
        (Resolución 2674 de 2013 Art 14 Numeral 1, 2,4, 5, 6,
        7, 8, 9, 11. Articulo 31 numeral 4 , artículo 35 numeral 5.)`,
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
        literal: '3.4',
        title: `Capacitación en manipulación higiénica de
        alimentos. (Resolución 2674 de 2013 Art. 12; 14.)`,
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
        title: `Suministro y calidad de agua potable.
        (Decreto 561 de 1984, Art. 92. Decreto 1575 de 2007,
        Artículo 10. Resolución 2674/2013, Artículo 6,
        Numeral 3. Resolución 2115 de 2007, Artículo 9.)`,
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
        title: `Residuos líquidos. (Resolución 2674/2013
        Artículo 6, Numeral 4)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 2.5 },
          { label: 'AR', val: 1.25 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '4.3',
        title: `Residuos sólidos.
        (Resolución 2674/2013 Artículo 6, Numerales 5.1,
        5.2 y 5.3)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 2.5 },
          { label: 'AR', val: 1.25 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '4.4',
        title: `Control integral de plagas.
        (Resolución 2674/2013 Artículo 26, Numeral 3.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 8 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '4.5',
        title: `Limpieza y desinfección de áreas, equipos y utensilios.
        (Resolución 2674/2013 Artículo 6 Numeral 6.5;
        Artículo 26 Numeral 1.)`,
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
        literal: '4.6',
        title: `Soportes documentales de saneamiento.
        (Decreto 1575 de 2007, Artículo 10.
        Resolución 2674/2013 Artículo 26.)`,
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
    aspect5: [
      {
        literal: '5.1',
        title: `Condiciones de almacenamiento
        (Resolución 2674 de 2013 Art. 27, Art. 28 Numeral 1,
        2, 3, 4, 6, 7; Art. 31 Numeral 1, 2, 3 y 4.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 8 },
          { label: 'AR', val: 4 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '5.2',
        title: `Manejo y conservación de productos refrigerados o
        congelados. (Ley 9 de 1979, Artículo 293, 425.
        Decreto 2278 de 1982, Art. Art. 359, 360, 361.
        Decreto 561 de 1984, Art. 31, 32, 33, 34, 35, 36, 90,
        100, 101, 102 y 103. Resolución 2674 de 2013
        Art. 27, Art. 28 Numeral 2; Art. 31 Numeral 1, 2, 3 y 4;
        Art. 35 Numeral 4.)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'A', val: 9 },
          { label: 'AR', val: 4.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '5.3',
        title: `Manejo de productos que se expenden a temperatura ambiente.
        (Resolución 2674 de 2013 Art. 27, Art. 28 Numeral 3,
        4; Art. 31 Numeral 1, 2, 3 y 4; Art. 35 Numeral 6.)`,
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
    aspect6: [
      {
        literal: '6.1',
        title: `Procedencia y requisitos legales
        (Decreto 561 de 1984, Art. 73. Decreto 1686 de 2012 Art. 47.
        Decreto 162 de 2021 Art. 46, 49 y 50.
        Resolución 2674 de 2013 Art. 31 parágrafo 2. Art. 37.
        Resolución 5109 de 2005)`,
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
      const aspects: string[] = ['aspect1', 'aspect2', 'aspect3', 'aspect4', 'aspect5', 'aspect6']
      const totalScore = aspects.reduce((total, aspect) => {
        const sum = state[aspect].reduce((acc: number, item: { value: number | null }) => acc + (item.value ?? 0), 0)
        return total + sum * weighting[aspect];
      }, 0);
      const scale = 20.78 // la escala esta dada por el puntaje maximo posible en porcentaje
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
      const aspectos = ['aspect1', 'aspect2', 'aspect3', 'aspect4', 'aspect5', 'aspect6']
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
