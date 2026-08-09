// Fonctions partagees entre tous les modeles de CV (Classique, Minimaliste,
// Moderne...) -- extraites ici pour ne pas les recopier dans chaque
// composant de previsualisation.

// Convertit "HTML / CSS, JavaScript, SQL" en ["HTML / CSS", "JavaScript",
// "SQL"] -- c'est seulement au moment d'afficher qu'on decoupe la chaine
// en tableau. Le formulaire, lui, ne manipule jamais que la chaine brute
// (voir le commentaire dans SkillsForm.jsx).
export function parseItems(text) {
  return text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

// Formate "2023-09" (format natif d'un <input type="month">) en "sept.
// 2023" pour l'affichage. Un champ vide devient "Present" (pratique pour
// une experience en cours, pas besoin de case "poste actuel" separee).
export function formatMonth(value) {
  if (!value) return 'Présent'
  const [year, month] = value.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}
