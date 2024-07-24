import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.1,
  aspect2: 0.12,
  aspect3: 0.22,
  aspect4: 0.24,
  aspect5: 0.28,
  aspect6: 0.04
}

export const useFAMA02 = defineStore('fama02', {
  state: () => ({
    aspect1: [
      {
        literal: '1.1',
        title: `Localización y diseño.
        (Ley 9/1979, Artículo 168, 262.
        Resolución 3009/2010, Artículo 67:
        Numeral 1, 2, 10. Resolución
        240/2013, Articulo 130: Numerales 1,
        2, 10. Resolución 242/2013, Artículo
        55: Numerales 1, 2, 10.)`,
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
        (Decreto 1500/2007, Artículo 26: Numeral 1.1.1. Resolución
        3009/2010, Artículo 67: Numerales 4, 5, 11.2. Resolución 240/2013,
        Artículo 130: Numerales 4, 5, 11.2. Resolución 242/2013, Artículo 55:
        Numerales 4, 5, 11.2.)`,
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
        (Decreto 1500/2007, Artículo 26: Numeral 1.1.1. Resolución
        3009/2010, Artículo 67: Numerales 3, 6, 7, 8, 9, 13, 14. Resolución
        240/2013, Artículo 130: Numerales 3, 6, 7, 8, 9, 13, 14. Resolución
        242/2013, Artículo 55: Numerales 3, 6, 7, 8, 9, 13, 14.)`,
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
        (Resolución 3009/2010, Articulo 67: Numerales 15, 16, 17, 18, 19.
        Resolución 240/2013, Articulo 130: Numerales 15, 16, 17, 18, 19.
        Resolución 242/2013, Artículo 55: Numerales 15, 16, 17, 18, 19.)`,
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
        title: `Programa de Mantenimiento de
        Instalaciones. (Decreto 1500/2007, Artículo 26,
        Numeral 1.2.1)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 1 },
          { label: 'AR', val: 0.5 },
          { label: 'I', val: 0 }
        ]
      }
    ],
    aspect2: [
      {
        literal: '2.1',
        title: `Condiciones de equipos y utensilios. (Decreto 1500/2007, Artículo 26:
        Numeral 1.1.1. Resolución 3009/2010, Artículo 67: Numerales
        22, 23 y 24. Resolución 683 de 2012. Resolución 4142 de 2012.
        Resolución 4143 de 2012. Resolución 240/13 Artículo 130:
        Numerales 22, 23 y 24. Resolución 242 /2013: Artículo 22: Numeral 2.1,
        3.2; Artículo 55: Numerales 22, 23, 24, 32, 33. Resolución 835 de 2013.)`,
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
        title: `Condiciones de los equipos de conservación.
        (Decreto 1500/2007, Artículo 36: Numeral 4. Resolución 3009/2010,
        Artículo 17: Numeral 3.3.2.1 Literal e; Artículo 66, Numeral 6, 7; Artículo 67:
        Numerales 25,26,27. Resolución 240/2013, Artículo 129: Numerales 1,
        6, 7, Artículo 130: Numerales 25, 26, 27. Resolución 242/2013, Artículo 24:
        Numerales 1.5, 2.1; Artículo 54: Numerales 7, 8; Artículo 55:
        Numerales 25, 26, 27)`,
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
        literal: '2.3',
        title: `Programa de Mantenimiento de
        Equipos y Utensilios. (Decreto 1500/2007, Artículo 26,
        Numeral 1.2.1)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 1 }
        ]
      }
    ],
    aspect3: [
      {
        literal: '3.1',
        title: `Estado de salud (signos / lesiones).
        (Decreto 1500/2007, Artículo 26, Numeral 1.1.13. Resolución
        3009/2010, Artículo 15: Numeral 1, 3.16; Artículo 67: Numeral 21.2.
        Resolución 240/2013, Artículo 14: Numeral 1; Artículo 15; Artículo 17:
        Numeral 16; Artículo 130: Numeral 21.2. Resolución 242/2013, Artículo
        13: Numeral 1; Artículo 14; Artículo 16: Numeral 16; Artículo 55: Numeral
        21.2. )`,
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
        title: `Reconocimiento médico. (Resolución 3009/2010, Artículo 15:
        Numerales 1; Artículo 67: Numeral 21.2. Decreto 1500/2007, Artículo 26:
        Numeral 1.1.13. Resolución 240/2013, Artículo 14: Numeral 1;
        Artículo 15. Resolución 242/2013, Artículo 13: Numeral 1; Artículo 14)`,
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
        title: `Prácticas higiénicas. (Resolución 3009/2010, Artículo 15:
        Numerales 3.1, 3.6, 3.7, 3.8, 3,11, 3.12, 3.14, 3.15. 3.17, 3.19; Artículo
        67: Numeral 21. Resolución 240/2013, Artículo 14: Numeral 3;
        Artículo 17: Numerales 1, 6, 7, 8, 11, 12, 14, 15, 16, 17, 19; Artículo 130,
        Numeral 21.2. Resolución 242/2013, Artículo 13: Numeral 3; Artículo 16:
        Numerales 1, 6, 7, 8, 11, 12, 14, 15, 17, 19)`,
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
        title: `Dotación personal. (Resolución 3009/2010, Artículo 15:
        Numerales 3.2, 3.3, 3.10, 3.13, 3.18, 3.20. Resolución 240/2013, Artículo
        17: Numerales 2, 3, 10, 13, 18, 20. Resolución 242/2013, Artículo 16:
        Numerales 2, 3, 10, 13, 18, 20)`,
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
        literal: '3.5',
        title: `Educación y Capacitación. (Resolución 3009/2010, Artículo 67:
        Numeral 21.3; Artículo 69: Numerales 1, 2, 3, 6. Resolución 240/2013,
        Artículo 14: Numeral 2; Artículo 132: Numerales: 1, 2, 4. Resolución
        242/2013, Artículo 13: Numeral 2; Artículo 57: Numerales 1, 2, 4)`,
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
    aspect4: [
      {
        literal: '4.1',
        title: `Recepción de materia prima. (Ley 09 de 1979 Artículo 345. Decreto
        1500 de 2007, Artículo 31: Numeral 4.2.2; Artículo 36, Numeral 1, 3;
        Artículo 41. Resolución 2009026594 de 2009 (en las especies que
        aplique). Resolución 3009/2010, Artículo 66: Numeral 3; Artículo 67:
        Numerales 28, 29. Resolución 240/2013, Artículo 129: Numeral 3;
        Artículo 130: Numerales 28, 29. Resolución 242/2013, Artículo 54:
        Numeral 4; Artículo 55: Numerales
        28, 29)`,
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
        literal: '4.2',
        title: `Trazabilidad (Decreto 1500/2007, Artículo 26:
        Numerales 1.2.2; Artículo 36: Numeral 5. Resolución 242/2013,
        Artículo 22: Numeral 3.3; Artículo 55: Numeral 32.)`,
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
        literal: '4.3',
        title: `Empaque y etiquetado. (Resolución 402 de 2002. Decreto
        1500 de 2007 Artículo 14, Numeral 1, 2, 3; Artículo 42, Numeral 1, 5, 6, 7,
        8, 9. Resolución 5109 de 2005. Resoluciones 683, 4142, 4143 de
        2012 y 834 de 2013. Resolución 3009/2010 Articulo 67 Numeral: 32.
        Resolución 222/1990 Artículo 3. Resolución 240/2013 Artículo 130:
        Numeral 32; Resolución 242 /2013
        Articulo 55: numeral 31)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'A', val: 3 },
          { label: 'AR', val: 1.5 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '4.4',
        title: `Manejo de temperaturas. (Ley 9 de 1979, Art. 425. Decreto
        1500/2007 Artículo 8, Parágrafo 1. Decreto 2270 de 2012 Artículo 5.
        Resolución 3009/2010 Artículo 17: Numeral 3.3.2.2, Literal b; Numeral
        3.3.2.3, Literal a; Artículo 66 Numeral: 2.1, 2.2, 6; Artículo 67 Numeral: 27.
        Resolución 240 de 2013 Artículo 129 numeral: 2, 4; Artículo 130: Numeral
        27. Resolución 242/2013, Artículo 22: Numeral 2.2, 3.1; Artículo 54:
        Numerales 3, 5; Artículo 55: Numerales: 27, 32)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        value: null,
        options: [
          { label: 'A', val: 7 },
          { label: 'I', val: 0 }
        ]
      },
      {
        literal: '4.5',
        title: `Condiciones de almacenamiento. (Resolución 3009/2010, Artículo 17:
        Numeral 3.3.2.2, Literal a, c, d, e; Numeral 3.3.2.3, Literal j. Articulo 67:
        Numeral 31, 32. Resolución 240/2013 Artículo 129; Numerales 1, 7;
        Artículo 130: Numeral 30, 31; Resolución 242/2013, Articulo 22:
        Numeral 2.3; Artículo 54: Numeral 2;
        Artículo 55: Numeral 30, 32, 36)`,
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
    aspect5: [
      {
        literal: '5.1',
        title: `Suministro y calidad de agua potable.
        (Decreto 1500/2007, Artículo 26: Numerales 1.1.11.1, 1.1.11.2,
        1.1.11.3. Decreto 1575 de 2007, Artículo 10: Numeral 2. Resolución
        2115/2007, Artículo 9. Resolución 3009/2010, Artículo 67: Numeral 3.
        Resolución 240/2013, Artículo 130: Numeral 3. Resolución 242/2013,
        Artículo 55: Numeral 3 )`,
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
        literal: '5.2',
        title: `Residuos líquidos. (Decreto 1500/2007, Artículo 26:
        Numeral 1.1.9. Resolución 3009/2010, Articulo 67: Numeral 20.
        Resolución 240/2013, Artículo 130: Numeral 20. Resolución 242/2013,
        Artículo 22: Numeral 2,4; Artículo 55: Numeral 20, 32)`,
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
        literal: '5.3',
        title: `Residuos sólidos. (Decreto 1500/2007, Artículo 26:
        Numeral 1.1.9. Resolución 3009/2010, Articulo 67: Numeral 20.
        Resolución 240/2013, Artículo 130: Numeral 20. Resolución 242/2013,
        Artículo 55: Numeral 20)`,
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
        title: `Control integral de plagas.
        (Decreto 1500/2007, Artículo 26:
        Numeral 1.1.8.)`,
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
        literal: '5.5',
        title: `Limpieza y desinfección de áreas,
        equipos y utensilios. (Decreto 1500/2007, Artículo 26,
        Numeral 1.1.12 Resolución 3009/2010, Articulo67:
        Numeral 12. Resolución 240/2013, Artículo 130: Numeral 12. Resolución
        242/2013, Artículo 55: Numerales 12, 38)`,
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
        literal: '5.6',
        title: `Soportes documentales. (Decreto 1500/2007, Artículo 26,
        Numerales 1.1.8, 1.1.9, 1.1.11)`,
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
    aspect6: [
      {
        literal: '6.1',
        title: `Condiciones del área. (Resolución 242/2013, Artículo 22:
        Numerales 1.1, 1.2, 1.3; Artículo 55: Numeral 32)`,
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
        return total + sum * weighting[aspect]
      }, 0)
      const scale = 21.04 // la escala esta dada por el puntaje maximo posible en porcentaje
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
