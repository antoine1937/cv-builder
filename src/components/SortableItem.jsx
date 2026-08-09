import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './SortableItem.css'

// Emballe n'importe quel contenu (ici une carte d'experience ou de
// formation) pour le rendre "attrapable" au glisser-deposer. Le hook
// useSortable fait tout le calcul de position -- on se contente de
// brancher ses valeurs sur un <div> normal.
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  // "transform" est recalcule par dnd-kit a chaque frame pendant qu'on
  // glisse un element -- CSS.Transform.toString() le convertit en une
  // vraie valeur CSS (translate3d(...)) qu'on applique via le style
  // inline. C'est ce qui fait "suivre la souris" visuellement.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="sortable-item">
      {/* Seule cette poignee est "prehensile" (attributes + listeners) --
          le reste de la carte (les champs de formulaire) reste cliquable
          normalement, sinon on ne pourrait plus taper dans les <input>. */}
      <button type="button" className="drag-handle" {...attributes} {...listeners} aria-label="Réordonner">
        ⠿
      </button>
      <div className="sortable-content">{children}</div>
    </div>
  )
}

export default SortableItem
