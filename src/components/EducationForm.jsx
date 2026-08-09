import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import SortableItem from './SortableItem'

// Meme pattern exactement que ExperienceForm -- une liste dynamique
// d'objets dans le state, modifiee via .map()/.filter() pour rester
// immutable, plus le glisser-deposer via dnd-kit. Voir les commentaires
// dans ExperienceForm.jsx pour le detail.
function EducationForm({ education, onChange }) {
  function updateEducation(id, field, value) {
    onChange(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    )
  }

  function addEducation() {
    const newEducation = {
      id: crypto.randomUUID(),
      title: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    onChange([...education, newEducation])
  }

  function removeEducation(id) {
    onChange(education.filter((edu) => edu.id !== id))
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = education.findIndex((edu) => edu.id === active.id)
    const newIndex = education.findIndex((edu) => edu.id === over.id)
    onChange(arrayMove(education, oldIndex, newIndex))
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={education.map((edu) => edu.id)} strategy={verticalListSortingStrategy}>
          {education.map((edu) => (
            <SortableItem key={edu.id} id={edu.id}>
              <div className="repeatable-item">
                <input
                  placeholder="Diplôme / formation"
                  value={edu.title}
                  onChange={(e) => updateEducation(edu.id, 'title', e.target.value)}
                />
                <input
                  placeholder="École"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                />
                <input
                  placeholder="Lieu"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                />
                <div className="date-row">
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
                <textarea
                  rows="2"
                  placeholder="Détails (optionnel)"
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                />
                <button type="button" className="remove-btn" onClick={() => removeEducation(edu.id)}>
                  Supprimer cette formation
                </button>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <button type="button" className="add-btn" onClick={addEducation}>
        + Ajouter une formation
      </button>
    </>
  )
}

export default EducationForm
