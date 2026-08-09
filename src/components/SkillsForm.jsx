// Piege classique evite ici : si on stockait "items" comme un tableau et
// qu'on le reconstruisait a chaque frappe (texte.split(',')), taper une
// virgule ferait immediatement disparaitre le "," affiche (une virgule en
// fin de texte donne un element vide, qu'on filtre -> le texte affiche
// "recule" au moment meme ou on tape). En gardant "items" comme une
// simple chaine dans le state, l'input affiche exactement ce qu'on tape,
// sans interference. On ne decoupe en tableau qu'au moment de l'affichage
// (voir CVPreview.jsx).
function SkillsForm({ skills, onChange }) {
  function updateCategory(id, field, value) {
    onChange(skills.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat)))
  }

  function addCategory() {
    const newCategory = { id: crypto.randomUUID(), category: '', items: '' }
    onChange([...skills, newCategory])
  }

  function removeCategory(id) {
    onChange(skills.filter((cat) => cat.id !== id))
  }

  return (
    <>
      {skills.map((cat) => (
        <div key={cat.id} className="repeatable-item">
          <input
            placeholder="Nom de la catégorie (ex : Langages)"
            value={cat.category}
            onChange={(e) => updateCategory(cat.id, 'category', e.target.value)}
          />
          <input
            placeholder="Compétences séparées par des virgules"
            value={cat.items}
            onChange={(e) => updateCategory(cat.id, 'items', e.target.value)}
          />
          <button type="button" className="remove-btn" onClick={() => removeCategory(cat.id)}>
            Supprimer cette catégorie
          </button>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addCategory}>
        + Ajouter une catégorie
      </button>
    </>
  )
}

export default SkillsForm
