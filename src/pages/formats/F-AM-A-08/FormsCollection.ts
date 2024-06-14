import entity from './IdentificationForm.vue'
import reasonVisit from './ReasonVisitForm.vue'
import evaluation1 from './Evaluation1Form.vue'
import evaluation2 from './Evaluation2Form.vue'
import concept from './ConceptForm.vue'
import samples from './SamplesForm.vue'
import sanitaryMeasure from './SanitaryMeasureForm.vue'
import observations from './ObservationsForm.vue'

/**
 * Arreglo de formularios
 * Aqui se registran todas los componentes usados por el formato o formulario
 * el orden de los formularios es importante, este debe estar acorde la propiedad
 * id: del objeto Tree
 * @constant formsCollection
 */
const formsCollection = [
  entity,
  reasonVisit,
  evaluation1,
  evaluation2,
  concept,
  samples,
  sanitaryMeasure,
  observations
]

export default formsCollection
