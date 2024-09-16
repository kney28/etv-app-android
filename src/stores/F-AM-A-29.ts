import { defineStore } from 'pinia'
import { usePrincipal } from './principal'

/**
 * Ponderación de los aspectos.
 */
const weighting: { [key: string]: number } = {
  aspect1: 0.3,
  aspect2: 0.1,
  aspect3: 0.25,
  'aspect4.1': 0.0625,
  'aspect4.2': 0.0625,
  'aspect4.3': 0.0625,
  'aspect4.4': 0.0625,
  aspect5: 0.1
}

export const useFAMA29 = defineStore('fama29', {
  state: () => ({
    documentaryReview: [
      {
        title: `Documento de sistema de seguridad y salud en el trabajo
        (en caso de no contar notificar a dirección territorial Ministerio de Trabajo)`,
        value: false,
        observations: null,
        labelInput: 'Observaciones'
      },
      {
        title: `Permiso de vertimientos (en caso de no contar notificar a autoridad ambiental)`,
        value: false,
        observations: null,
        labelInput: 'Observaciones'
      },
      {
        title: `Si se requiere de medidas de control, la empresa contratada para ejecutar el programa de control de plagas cuenta con
        concepto sanitario favorable expedido por la autoridad sanitaria del área de jurisdicción`,
        value: false,
        observations: null,
        labelInput: 'Observaciones'
      },
      {
        title: `Contrato con gestor de residuos (en caso de no contar notificar a autoridad ambiental)`,
        value: false,
        observations: null,
        labelInput: 'Observaciones'
      },
      {
        title: `Cuenta con hojas de seguridad y matriz de compatibilidad de sustancias químicas(Articulo 102 de la Ley 9 de 1979)(Art
        8 ley 55 de 1993)`,
        value: false,
        observations: null,
        labelInput: 'Observaciones'
      },
      {
        title: `Listado de inventario de insumos químicos empleados en el laboratorio de química (estado, cantidad almacenada)`,
        value: false,
        observations: null,
        labelInput: 'Observaciones'
      },
      {
        title: `Listado de inventario de residuos peligrosos (Tipo de residuo, cantidad generada)`,
        value: false,
        observations: null,
        labelInput: 'Observaciones'
      }
    ],
    codeFiled: '',
    typeSanitaryMeasure: {
      typeValue: null,
      actNumber: null,
      options: [
        {
          label: 'Clausura temporal total',
          val: 1
        },
        {
          label: 'Clausura temporal parcial',
          val: 2
        },
        {
          label: 'Suspensión parcial de trabajos o servicios',
          val: 3
        },
        {
          label: 'Suspensión total de trabajos o servicios',
          val: 4
        },
        {
          label: 'Aislamiento o internación de personas para evitar la transmisión de enfermedades',
          val: 5
        },
        {
          label: 'Decomiso',
          val: 6
        },
        {
          label: 'Destrucción o desnaturalización',
          val: 7
        },
        {
          label: 'Congelación',
          val: 8
        },
        {
          label: 'Captura y observación de animales sospechosos de',
          val: 9
        },
        {
          label: 'Vacunación personas o animales',
          val: 10
        },
        {
          label: 'Destrucción o desnaturalización',
          val: 11
        },
        {
          label: 'Control de insectos u otra fauna nociva o transmisora de',
          val: 12
        },
        {
          label: 'Desocupación o desalojamiento de establecimientos o vivienda',
          val: 13
        }
      ]
    },
    diasHabilesPlazo: null,
    fechasPlazo: { from: null, to: null },
    aspect1: [
      {
        literal: '1.1',
        title: `El establecimiento está ubicado en un lugar no inundable y
        en terreno de fácil drenaje (Art 160, Art 162 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.2',
        title: `El establecimiento está alejado de botaderos de basura, aguas estancadas, criaderos de insectos y roedores,
        plantas de beneficio, cementerios y, en general, a focos de insalubridad e inseguridad evitar en las zonas de riesgo,
        que ofrezcan peligro de inundación, erosión (Art 162, Art 163 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.3',
        title: `En el establecimiento las paredes y techos son sólidos de fácil limpieza, desinfección y resistentes a factores
        ambientales (Art 195 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.4',
        title: `En el establecimiento los pisos son sólidos, impermeables, antideslizantes, de fácil limpieza, desinfección y
        resistentes a factores ambientales y uniformes, de manera que ofrezcan continuidad para evitar tropiezos y
        accidentes, nivelados para facilitar el drenaje (Art 193, 194 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.5',
        title: `Las escaleras, rampas, son seguras, cuentan con pasamamanos y estan revestidas de material antideslizantes.
        (Art 47 y 48 Resolucion 14861 de 1985)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.6',
        title: `Las áreas de circulación deberán estar claramente demarcadas, tener la amplitud suficiente para el tránsito seguro
        de las personas y estar provistas de la señalización adecuada y demás medidas necesarias para evitar accidentes,
        en los corredores internos se cumple con las disposiciones establecidas en el (Art 46 Resolución 14861 de 1985)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.7',
        title: `Todos los equipos, herramientas, instalaciones y redes eléctricas están diseñados, construidos, instalados,
        mantenidos, accionados y señalizados de manera que se prevengan los riesgos de incendio y se evite el contacto
        con los elementos sometidos a tensión. (Art 117 de la Ley 9)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.8',
        title: `La ventilación natural y/o artificial es permanente y suficiente, con el objeto de evitar la acumulación de
        olores, gases, condensación de vapores (Art 197 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.9',
        title: `La iluminación natural y artificial es suficiente, adecuada y calidad, para prevenir efectos nocivos en la salud de los
        trabajadores, estudiantes y para garantizar adecuadas condiciones de visibilidad y seguridad. (Art 196 Ley 9 de
        1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.10',
        title: `El área total de las edificaciones y de las aulas en los establecimientos de enseñanza esta acorde con el número de
        personas que alberga habitualmente. (Art 91 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 4 },
          { label: 'CP', val: 2 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '1.11',
        title: `El mobiliario (sillas,mesas,pupitres, tablero) utilizado por los estudiantes se encuentra en buenas condiciones para
        su funcionamiento`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      }
    ],
    aspect2: [
      {
        literal: '2.1',
        title: `Las áreas de los laboratorios del establecimiento se encuentran separadas, delimitadas y para uso exclusivo para el
        desarrollo de las actividades`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.2',
        title: `Los pisos, paredes y techos son de materiales sólidos, de fácil limpieza, resistentes a factores ambientales y se
        encuentran en buen estado. (Art 91 Ley 9 de 1979)(Art 195 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.3',
        title: `Cuenta con un área para el almacenamiento seguro de sustancias químicas y reactivos utilizados en el
        laboratorio.(Art 121 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.4',
        title: `El personal docente y estudiantil cuenta con los elementos de protección personal para la elaboración de las
        pruebas de laboratorio.(Art 85 y 123 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.5',
        title: `Cuenta con procedimientos en caso de derrames o accidentes con sustancias químicas (Art 102 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.6',
        title: `Cuenta con mecanismos de seguridad en caso de emplear gas, energía o utilizar equipos para las pruebas de
        laboratorio`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.7',
        title: `Cuenta con equipos para la extracción de vapores orgánicos e inorgánicos de acuerdo a las pruebas realizadas en
        los laboratorios`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.8',
        title: `Cuenta con equipos para la atención de accidentes (ducha lavaojos)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '2.9',
        title: `La señalización de las áreas del laboratorio son acordes a los posibles riesgos y peligros identificados al momento
        de realizar las pruebas (Art 206 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      }
    ],
    aspect3: [
      {
        literal: '3.1',
        title: `El establecimiento cuenta con servicios sanitarios dotados con los mecanismos o elementos para la higiene
        personal, separados por sexo, en correcto funcionamiento, limpios y en cantidad suficientes para uso de los
        profesores (inodoros lavamanos y Ducha). Art 50 Resolución 14861 de 1985) (Art 212 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 5 },
          { label: 'CP', val: 2.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '3.2',
        title: `El establecimiento cuenta con servicios sanitarios dotados con los mecanismos o elementos para la higiene
        personal, separados por sexo, en correcto funcionamiento, limpios y en cantidad suficientes para uso de los
        estudiantes (inodoros y lavamanos). Art 50 Resolución 14681 de 1985) (Art 212 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 7 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '3.3',
        title: `El establecimiento cuenta con servicios sanitarios para la población discapacitada cumpliendo con las disposiciones
        del marco legal (Art 50 Resolución 14861 de 1985)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 5 },
          { label: 'CP', val: 2.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '3.4',
        title: `El establecimiento se mantiene en orden, aseo y cuenta con un programa de limpieza y desinfección para las
        instalaciones, equipos y mobiliario documentado e implementado (procedimientos, planillas, concentraciones y
        registros). (art 207 ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 5 },
          { label: 'CP', val: 2.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '3.5',
        title: `El establecimiento dispone de cuartos independientes con poceta o unidades para lavado de implementos de aseo
        y espacio suficiente para colocación de escobas, traperos, jabones, detergentes y otros implementos usados con el
        mismo propósito`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      }
    ],
    'aspect4.1': [
      {
        literal: '4.1.1',
        title: `El establecimiento se encuentra conectado a la red del sistema de acueducto u otro sistema alternativo`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.1.2',
        title: `El establecimiento cuenta con suministro y acceso a agua potable (Art 165 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.1.3',
        title: `Las instalaciones interiores para suministro de agua están diseñadas y construidas para su funcionamiento normal
        con dotación de servicio continuo y presión de servicio en todos los sitios de consumo (Art 175 y 176 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.1.4',
        title: `El establecimiento cuenta con tanques para el almacenamiento de agua potable, debidamente protegidos y con
        capacidad suficiente para garantizar el suministro en la totalidad de sus instalaciones. (Art 10 Decreto 1575 de
        2007)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.1.5',
        title: `El establecimiento realiza semestralmente o cuando este visiblemente sucio, el lavado y desinfección de los
        tanques de almacenamiento de agua potable, (revisar soportes). (Art 10 Decreto 1575 de 2007)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      }
    ],
    'aspect4.2': [
      {
        literal: '4.2.1',
        title: `Las aguas residuales generadas por el establecimiento son conectadas al sistema alcantarillado u otro sistemas
        alternativos. (Art 36 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.2.2',
        title: `Las instalaciones para evacuación de residuos líquidos están diseñadas y construidas para que permitan
        escurrimiento, eviten obstrucciones, impida el paso de gases y animales de la red pública al interior, no permitan el
        vaciamiento, el escape de líquido o la formación de depósitos en el interior de las tuberías y finalmente, se evite la
        conexión o interconexión con tanques de almacenamiento y sistemas de agua potable (Art 177 Ley 9 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      }
    ],
    'aspect4.3': [
      {
        literal: '4.3.1',
        title: `Cuenta con plan de gestión integral de residuos no peligrosos y peligrosos documentado e implementado, que
        incluya los biológico infecciosos ( si cuenta con laboratorios, anfiteatro, clínicas veterinarias docencia) Decreto 780
        de 2016 Titulo X 351 y Resolución 1164 de 2002`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 3 },
          { label: 'CP', val: 1.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.3.2',
        title: `Cuenta con área para el almacenamiento de residuos (Art 198 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.3.3',
        title: `Cuenta con recipientes de material rígido que facilita su limpieza y desinfección e identificados para el manejo de
        residuos y da cumplimiento al código de colores`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      }
    ],
    'aspect4.4': [
      {
        literal: '4.4.1',
        title: `Existe un programa de manejo control integral de plagas documentado e implementado (Art 201 y Art 593 Ley 09
          de 79)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '4.4.2',
        title: `En el establecimiento no se evidencia la presencia de plagas o daños ocasionados por éstas y se establecen
        medidas preventivas para el control y propagación. (Art 168 Ley 09 de 79)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 5 },
          { label: 'NC', val: 0 }
        ]
      }
    ],
    aspect5: [
      {
        literal: '5.1',
        title: `Existe plan de gestión del riesgo de desastres documentado e implementado.
        (Artículo 2.3.1.5.2.1 Decreto 2157 de 2017)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '5.2',
        title: `Se encuentran claramente señalizadas las diferentes áreas y secciones en cuanto a acceso y circulación de
        personas, servicios, seguridad, salidas de emergencia, etc. (Art 52 Resolución 14861 de 1985)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '5.3',
        title: `El establecimiento cuenta con sistemas para la contención de derrames de sustancias químicas en el laboratorio`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '5.4',
        title: `El establecimiento tiene alarma de emergencia.(Art 52 Resolución 14861 de 1985)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '5.5',
        title: `La institución cuenta con extintores o gabinetes contra incendios cargados y debidamente señalizados en perfecto
        estado de funcionamiento. (Art 205 Ley 9 de 1979) (Art 52,54 Resolución 14861 de 1985)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '5.6',
        title: `Cuenta con área de enfermería para primeros auxilios(Art 214 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 2 },
          { label: 'CP', val: 1 },
          { label: 'NC', val: 0 }
        ]
      },
      {
        literal: '5.7',
        title: `Existe botiquín completo de primeros auxilios.(Art 127 Ley 9 de 1979)`,
        observations: '',
        labelObs: 'Hallazgos',
        cr: false,
        na: false,
        value: null,
        options: [
          { label: 'C', val: 1 },
          { label: 'CP', val: 0.5 },
          { label: 'NC', val: 0 }
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
      const aspects1: string[] = ['aspect1', 'aspect2', 'aspect3', 'aspect5']
      const aspects2: string[] = ['aspect4.1', 'aspect4.2', 'aspect4.3', 'aspect4.4']
      const totalScore1 = aspects1.reduce((total, aspect) => {
        const sum = state[aspect].reduce((acc: number, item: { value: number | null }) => acc + (item.value ?? 0), 0)
        return total + sum * weighting[aspect]
      }, 0)
      const partialScore = aspects2.reduce((total, aspect) => {
        const sum = state[aspect].reduce((acc: number, item: { value: number | null }) => acc + (item.value ?? 0), 0)
        return total + sum * weighting[aspect]
      }, 0)
      const scaleAspect2 = 25  // la escala de la sección 4, ya que esta esta subdividida
      const totalScore2 = Number(((partialScore * 100) / scaleAspect2).toFixed(2))
      const scale = 23.5  // la escala esta dada por el puntaje maximo posible en porcentaje
      return Number((((totalScore1 + totalScore2) * 100) / scale).toFixed(2))
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
      if (score >= 95 && score <= 100 && !hasCriticalPoints) {
        return 'Favorable'
      } else if (score >= 50 && score < 94.9 && !hasCriticalPoints) {
        return 'Favorable con requerimientos'
      } else if (score < 49.9 || hasCriticalPoints) {
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
      const aspectos = ['aspect1', 'aspect2', 'aspect3', 'aspect4.1', 'aspect4.2', 'aspect4.3', 'aspect4.4', 'aspect5']
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
