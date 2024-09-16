import entity from './IdentificationForm.vue'
import reasonVisit from './ReasonVisitForm.vue'
import DocumentaryReview from './DocumentaryReview.vue'
import evaluation1 from './Evaluation1Form.vue'
import evaluation2 from './Evaluation2Form.vue'
import evaluation3 from './Evaluation3Form.vue'
import evaluation4A from './Evaluation4.1Form.vue'
import evaluation4B from './Evaluation4.2Form.vue'
import evaluation4C from './Evaluation4.3Form.vue'
import evaluation4D from './Evaluation4.4Form.vue'
import evaluation5 from './Evaluation5Form.vue'
import concept from './ConceptForm.vue'
import sanitaryRequirements from './SanitaryRequirementsForm.vue'
import samples from './SamplesForm.vue'
import observations from './ObservationsForm.vue'
import sanitaryMeasure from './SanitaryMeasureForm.vue'
import compilanceDeadline from './ComplianceDeadlineForm.vue'

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
  DocumentaryReview,
  evaluation1,
  evaluation2,
  evaluation3,
  evaluation4A,
  evaluation4B,
  evaluation4C,
  evaluation4D,
  evaluation5,
  concept,
  samples,
  sanitaryRequirements,
  observations,
  sanitaryMeasure,
  compilanceDeadline
]

export default formsCollection
