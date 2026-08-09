import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import SortableItem from './SortableItem'

// Le coeur du pattern "liste dynamique" en React : "experiences" est un
// tableau d'objets dans le state. Pour modifier UNE entree sans toucher
// aux autres, on ne mute jamais le tableau existant -- on en cree un
// nouveau avec .map() (pattern "immutabilite", tres important en React :
// muter le state directement ne declenche pas toujours un re-render).
function ExperienceForm({ experiences, onChange }) {
  function updateExperience(id, field, value) {
    onChange(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    )
  }

  function addExperience() {
    const newExperience = {
      id: crypto.randomUUID(), // identifiant unique, indispensable pour la prop "key" plus bas
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    onChange([...experiences, newExperience])
  }

  function removeExperience(id) {
    onChange(experiences.filter((exp) => exp.id !== id))
  }

  // Appele quand on relache une carte glissee. "active" = la carte qu'on
  // deplacait, "over" = celle sur laquelle on l'a lachee. arrayMove()
  // (fourni par dnd-kit) fait le travail de reordonner le tableau --
  // pareil que .map()/.filter() plus haut, on ne mute jamais l'existant,
  // on cree un nouveau tableau qu'on passe a onChange.
  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = experiences.findIndex((exp) => exp.id === active.id)
    const newIndex = experiences.findIndex((exp) => exp.id === over.id)
    onChange(arrayMove(experiences, oldIndex, newIndex))
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* SortableContext a besoin de la liste des id, dans l'ordre
            actuel, pour savoir calculer les positions pendant le glisser. */}
        <SortableContext items={experiences.map((exp) => exp.id)} strategy={verticalListSortingStrategy}>
          {experiences.map((exp) => (
            <SortableItem key={exp.id} id={exp.id}>
              <div className="repeatable-item">
                <input
                  placeholder="Poste"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                />
                <input
                  placeholder="Entreprise"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
                <input
                  placeholder="Lieu"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                />
                <div className="date-row">
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  />
                </div>
                <textarea
                  rows="2"
                  placeholder="Description des missions"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                />
                <button type="button" className="remove-btn" onClick={() => removeExperience(exp.id)}>
                  Supprimer cette expérience
                </button>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <button type="button" className="add-btn" onClick={addExperience}>
        + Ajouter une expérience
      </button>
    </>
  )
}

export default ExperienceForm
