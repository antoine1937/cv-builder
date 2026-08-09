import { useState } from 'react'
import './CollapsibleSection.css'

// Emballe une section de formulaire pour la rendre repliable. Chaque
// section gere son propre etat ouvert/ferme (useState local) -- pas
// besoin de le faire remonter dans App.jsx, rien d'autre dans l'appli
// n'a besoin de savoir quelle section est ouverte.
function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <section className="form-section collapsible-section">
      <button
        type="button"
        className="collapsible-header"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="collapsible-chevron">{isOpen ? '▾' : '▸'}</span>
      </button>

      {/* On ne rend le contenu QUE si la section est ouverte : ca evite
          de garder des centaines de champs invisibles dans le DOM pour
          rien quand il y a beaucoup d'entrees (7 experiences, etc). */}
      {isOpen && <div className="collapsible-body">{children}</div>}
    </section>
  )
}

export default CollapsibleSection
