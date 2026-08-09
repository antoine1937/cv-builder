import './TemplateSelector.css'

const TEMPLATES = [
  { id: 'classic', label: 'Classique' },
  { id: 'minimal', label: 'Minimaliste' },
  { id: 'modern', label: 'Moderne' },
]

// Un simple groupe de boutons : "selected" est la valeur actuelle
// (stockee dans App.jsx), "onSelect" est appele avec l'id du modele
// choisi. Le composant ne connait rien du contenu de chaque modele --
// il se contente de proposer un choix.
function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="template-selector no-print">
      {TEMPLATES.map((tpl) => (
        <button
          key={tpl.id}
          type="button"
          className={tpl.id === selected ? 'template-btn active' : 'template-btn'}
          onClick={() => onSelect(tpl.id)}
        >
          {tpl.label}
        </button>
      ))}
    </div>
  )
}

export default TemplateSelector
