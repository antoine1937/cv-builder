import { useState, useEffect } from 'react'

// Un formulaire "controle" : chaque <input> tient sa valeur depuis le
// state (value={...}) et previent React de tout changement (onChange).
// Rien n'est stocke dans le DOM lui-meme -- c'est React qui est la seule
// source de verite. C'est LE pattern standard pour les formulaires React.
function PersonalInfoForm({ personal, onChange }) {
  // Met a jour un seul champ de "personal" sans toucher aux autres :
  // on recopie tout l'objet existant (...personal) et on ecrase juste
  // la propriete concernee.
  function updateField(field, value) {
    onChange({ ...personal, [field]: value })
  }

  // --- Autocomplete de ville, via l'API publique du gouvernement francais
  // (geo.api.gouv.fr, gratuite, sans cle) -- meme principe que l'API
  // meteo du premier projet, appliquee cette fois dans un composant React.
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const query = personal.location.trim()
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    // "Debounce" : on attend 300ms apres la derniere frappe avant d'appeler
    // l'API. Sans ca, on enverrait une requete a CHAQUE lettre tapee.
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,codesPostaux&boost=population&limit=5`
        )
        const communes = await res.json()

        // Une commune peut avoir plusieurs codes postaux (Toulouse en a
        // plusieurs, par exemple) -- on propose une suggestion par
        // combinaison ville/code postal.
        const options = communes.flatMap((commune) =>
          commune.codesPostaux.map((cp) => `${commune.nom} - ${cp}`)
        )
        setSuggestions(options.slice(0, 8))
      } catch {
        setSuggestions([])
      }
    }, 300)

    // La fonction retournee par useEffect est appelee juste avant que
    // l'effet se rejoue (donc a chaque nouvelle frappe) OU quand le
    // composant disparait. Ici, ca annule le timeout precedent : si on
    // retape une lettre avant la fin des 300ms, l'ancienne requete
    // programmee est annulee, seule la derniere frappe finit par partir.
    return () => clearTimeout(timeoutId)
  }, [personal.location])

  function selectSuggestion(value) {
    updateField('location', value)
    setSuggestions([])
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (!file) return

    // FileReader convertit l'image choisie en "data URL" (le contenu de
    // l'image encode directement en texte). Pratique ici : on peut la
    // stocker dans le state comme une simple chaine et l'afficher avec
    // un <img src="..."> classique, sans avoir besoin d'un serveur pour
    // heberger le fichier quelque part.
    const reader = new FileReader()
    reader.onload = () => updateField('photo', reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <>
      <label htmlFor="name">Nom complet</label>
      <input
        id="name"
        type="text"
        value={personal.name}
        onChange={(e) => updateField('name', e.target.value)}
      />

      <label htmlFor="title">Titre / accroche</label>
      <input
        id="title"
        type="text"
        value={personal.title}
        onChange={(e) => updateField('title', e.target.value)}
        placeholder="Ex : Recherche d'alternance en developpement web"
      />

      <label htmlFor="summary">Résumé / phrase d'intro (facultatif)</label>
      <textarea
        id="summary"
        rows="2"
        value={personal.summary}
        onChange={(e) => updateField('summary', e.target.value)}
        placeholder="Ex : Passionne par le developpement web, je cherche a mettre en pratique mes competences en entreprise."
      />

      {/* Regroupees deux par deux (comme les dates dans ExperienceForm)
          pour ne pas empiler 4 champs pleine largeur d'affilee. */}
      <div className="field-row">
        <div className="field-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={personal.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>
        <div className="field-col">
          <label htmlFor="phone">Téléphone</label>
          <input
            id="phone"
            type="tel"
            value={personal.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field-col">
          <label htmlFor="age">Âge</label>
          <input
            id="age"
            type="text"
            value={personal.age}
            onChange={(e) => updateField('age', e.target.value)}
            placeholder="Ex : 29 ans"
          />
        </div>
        <div className="field-col autocomplete-wrapper">
          <label htmlFor="location">Localisation</label>
          <input
            id="location"
            type="text"
            value={personal.location}
            onChange={(e) => updateField('location', e.target.value)}
            autoComplete="off"
            placeholder="Tape une ville..."
          />
          {suggestions.length > 0 && (
            <ul className="autocomplete-list">
              {suggestions.map((suggestion) => (
                <li key={suggestion} onClick={() => selectSuggestion(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <label htmlFor="photo">Photo</label>
      <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
    </>
  )
}

export default PersonalInfoForm
