import { useState, useEffect } from 'react'
import { defaultData } from './data/defaultData'
import { blankData } from './data/blankData'
import CVForm from './components/CVForm'
import CVPreview from './components/CVPreview'
import TemplateSelector from './components/TemplateSelector'
import './App.css'

// Les cles sous lesquelles on range les donnees dans le localStorage du
// navigateur -- juste des chaines de texte, servent a les retrouver plus tard.
const STORAGE_KEY = 'cv-builder-data'
const BACKUP_KEY = 'cv-builder-backup'

function App() {
  // "cvData" est LA source de verite de toute l'app : le formulaire la
  // modifie, l'apercu l'affiche. Les deux composants ne communiquent
  // jamais directement entre eux, ils passent toujours par ce state du
  // parent (App) -- c'est le pattern React qu'on appelle "lifting state
  // up" (faire remonter l'etat au plus proche ancetre commun).
  //
  // Au lieu de toujours demarrer sur "defaultData", on passe une FONCTION
  // a useState : React ne l'execute qu'une seule fois, au tout premier
  // rendu (c'est ce qu'on appelle une "initialisation paresseuse"). Ici,
  // ca sert a aller lire le localStorage pour recuperer ce que l'utilisateur
  // avait deja rempli la derniere fois -- s'il y a quelque chose.
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultData
  })

  // useEffect execute son code APRES le rendu, et le tableau [cvData] a la
  // fin dit "seulement si cvData a change depuis le rendu precedent". On
  // s'en sert ici pour sauvegarder automatiquement dans le localStorage a
  // chaque modification du CV -- sans ca, un rafraichissement de page (ou
  // fermer l'onglet) ferait tout perdre.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData))
  }, [cvData])

  // Le modele choisi (classic / minimal / modern) est un state a part,
  // independant des donnees du CV : changer de modele ne touche jamais
  // "cvData", et remplir le formulaire ne touche jamais "template".
  const [template, setTemplate] = useState('classic')

  // Garde une copie du CV juste avant une reinitialisation, pour pouvoir
  // annuler. "null" = pas de sauvegarde en attente (donc pas de bouton
  // "Restaurer" affiche). Comme pour "cvData", on la lit aussi depuis le
  // localStorage au demarrage -- sinon un simple rechargement de page
  // ferait perdre la possibilite d'annuler (c'est exactement ce qui
  // vient de se passer : "previousData" n'existait qu'en memoire, donc
  // un F5 l'effacait, alors que la version vide, elle, avait deja ete
  // sauvegardee dans le localStorage par l'autre useEffect).
  const [previousData, setPreviousData] = useState(() => {
    const saved = localStorage.getItem(BACKUP_KEY)
    return saved ? JSON.parse(saved) : null
  })

  function resetCV() {
    const confirmed = window.confirm('Réinitialiser le CV ? Tu pourras annuler juste après si besoin.')
    if (!confirmed) return
    setPreviousData(cvData)
    localStorage.setItem(BACKUP_KEY, JSON.stringify(cvData))
    setCvData(blankData)
  }

  function restoreCV() {
    setCvData(previousData)
    setPreviousData(null)
    localStorage.removeItem(BACKUP_KEY)
  }

  return (
    <div className="app">
      <header className="app-header no-print">
        <h1>Générateur de CV</h1>

        <TemplateSelector selected={template} onSelect={setTemplate} />

        {/* window.print() declenche la boite de dialogue d'impression native
            du navigateur, qui propose "Enregistrer en PDF" comme imprimante
            -- pas besoin de librairie externe pour generer un PDF. Les
            regles CSS "@media print" (voir App.css) cachent tout sauf
            le CV au moment d'imprimer. */}
        <div className="header-actions">
          <button type="button" className="print-btn" onClick={() => window.print()}>
            🖨️ Imprimer / Exporter en PDF
          </button>
          {/* Le meme bouton change de role selon qu'une reinitialisation
              vient d'avoir lieu ou non -- pas besoin d'un bouton en plus. */}
          {previousData ? (
            <button type="button" className="reset-btn" onClick={restoreCV}>
              ↩️ Restaurer mes données
            </button>
          ) : (
            <button type="button" className="reset-btn" onClick={resetCV}>
              🗑️ Réinitialiser
            </button>
          )}
        </div>
      </header>

      <main className="layout">
        <CVForm data={cvData} onChange={setCvData} />
        <CVPreview data={cvData} template={template} />
      </main>
    </div>
  )
}

export default App
