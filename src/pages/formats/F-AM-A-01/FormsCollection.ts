import entity from './IdentificationForm.vue'
import reasonVisit from './ReasonVisitForm.vue'
import evaluation1 from './Evaluation1Form.vue'
import evaluation2 from './Evaluation2Form.vue'
import evaluation3 from './Evaluation3Form.vue'
import evaluation4 from './Evaluation4Form.vue'
import evaluation5 from './Evaluation5Form.vue'
import concept from './ConceptForm.vue'
import sanitaryRequirements from './SanitaryRequirementsForm.vue'
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
  evaluation3,
  evaluation4,
  evaluation5,
  concept,
  samples,
  sanitaryRequirements,
  sanitaryMeasure,
  observations
]

export default formsCollection
