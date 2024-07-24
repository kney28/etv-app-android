import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.10,
  aspect2: 0.19,
  aspect3: 0.19,
  aspect4: 0.38,
  aspect5: 0.14
}

export const useFAMA07 = defineStore('fama07', {
  state: () => ({
    aspect1: [
      {
        literal: '1.1',
        title: `Localización y diseño.
        (Decreto 1686 de 2012 Artículo 23. Numerales
        1.1, 1.2, 1.3, 2.1, 2.2, 2.3; 2.6, 2.7 Artículo 84 y 85).`,
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
        title: `Condiciones de pisos y paredes.
        (Decreto 1686 de 2012 Artículo 24. Numerales 1 y 2. Artículo 84 y 85).`,
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
        (Decreto 1686 de 2012 Artículo 24. Numerales 3
        y 7.1, 7.2, 8.2. Artículo 84 y 85).`,
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
        (Decreto 1686 de 2012 Artículo 23. Numerales
          6.1, 6.2, 6.3. Artículo 84 y 85).`,
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
        title: `Estado de salud.
        (Decreto 1686 de 2012. Articulo 26. Articulo 28.
        Numeral 10. Articulo 84)`,
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
        title: `Prácticas higiénicas.
        (Decreto 1686 de 2012. Articulo 28.
         Numerales 1,2,3,4,5,6,7,8,9)`,
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
        literal: '2.3',
        title: `Educación y capacitación.
        (Decreto 162 de 2021 Articulo 27)`,
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
    aspect3: [
      {
        literal: '3.1',
        title: `Condiciones de equipos y utensilios y
        Superficies de contacto con las bebidas alcohólicas.
        (Decreto 1686 de 2012. Artículo 25. Numerales
        1, 2,8. Artículo 30 Parágrafo. Resoluciones 683,
        4142 y 4143 de 2012; 834 y 835 de 2013)`,
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
        title: `Prevención de la contaminación cruzada.
        (Decreto 1686 de 2012. Artículo 25. Numeral 1.`,
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
        literal: '3.3',
        title: `Condiciones de almacenamiento
        (Decreto 1686 de 2012. Artículo 82. Numerales 2, 4, 5, 6, 7 y 8).`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'A', val: 7 },
          { label: 'AR', val: 3.5 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect4: [
      {
        literal: '4.1',
        title: `Suministro y calidad de agua potable.
        (Decreto 1686 de 2012 Articulo 23, Numeral 3. Articulo 86.
        Resolución 2115 de 2007, Artículo 9. Decreto
        1575 de 2007. Artículo 10 Numeral 3)`,
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
        literal: '4.2',
        title: `Residuos líquidos.
        (Resolución 604 de 1993. Art. 26; 30; 31; 32; 34; 35; 36.
        Resolución 2674 Art. 31; 35 numeral 2, 3,4, 7, 10.)`,
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
        literal: '4.3',
        title: `Residuos sólidos.
        (Decreto 1686 de 2012. Articulo 23. Numeral 5.
        Artículo 25. Numeral 7. Articulo 86)`,
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
        literal: '4.4',
        title: `Control integral de plagas.
        (Decreto 1686 de 2012. Art. 35 Numeral 3)`,
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
        literal: '4.5',
        title: `Limpieza y desinfección de áreas, equipos y utensilios.
        (Decreto 1686 de 2012. Artículo 23 Numeral
        6.4). Artículo 82. Numeral 1; Artículo 35 Numeral 1)`,
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
        literal: '4.6',
        title: `Soportes documentales de saneamiento.
        (Decreto 1686 de 2012. Artículo 35; Artículo 86).`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 3 },
          { label: 'AR', val: 1.5 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect5: [
      {
        literal: '5.1',
        title: `Procedencia de bebidas alcohólicas.
        (Decreto 1686 de 2012 Artículo 47. Artículo 82,
        Numeral 3; Decreto 162 de 2021 Artículo 46)`,
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
        title: `Leyendas obligatorias.
        (Decreto 162 de 2021 Artículo 50)`,
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
      const scale = 24.62  // la escala esta dada por el puntaje maximo posible en porcentaje
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
