import ClassicPreview from './previews/ClassicPreview'
import MinimalPreview from './previews/MinimalPreview'
import ModernPreview from './previews/ModernPreview'

// CVPreview ne dessine plus rien lui-meme : il choisit juste QUEL
// composant de previsualisation afficher selon "template", et lui passe
// les memes donnees. Ajouter un futur 4e modele ne demandera qu'une
// ligne de plus ici, sans toucher au reste de l'app.
function CVPreview({ data, template }) {
  if (template === 'minimal') return <MinimalPreview data={data} />
  if (template === 'modern') return <ModernPreview data={data} />
  return <ClassicPreview data={data} />
}

export default CVPreview
