# Générateur de CV

Un générateur de CV en React : formulaire à gauche, aperçu en direct à droite, export en PDF. Troisième projet de mon portfolio, celui qui montre React (les deux précédents sont en HTML/CSS/JS vanilla).

## Fonctionnalités

- Formulaire complet : informations personnelles, compétences (par catégories), expériences professionnelles, formations
- Aperçu du CV qui se met à jour en temps réel pendant la saisie
- **3 modèles visuels** différents (Classique, Minimaliste, Moderne), interchangeables à tout moment
- Listes dynamiques : ajouter/modifier/supprimer des expériences, formations et catégories de compétences
- **Glisser-déposer** pour réordonner les expériences et les formations
- Sections du formulaire repliables (utile avec un CV complet, pour éviter un scroll interminable)
- **Autocomplete de ville** pour le champ localisation (API officielle du gouvernement français)
- Sauvegarde automatique dans le navigateur (`localStorage`) — les données ne se perdent pas au rechargement
- Bouton pour réinitialiser le CV (avec possibilité d'annuler), pratique pour tester l'outil avec ses propres infos
- Export en PDF via l'impression native du navigateur

## Stack technique

- **React** + **Vite** (build tool)
- JavaScript vanilla pour la logique (pas de librairie de gestion d'état, `useState`/`useEffect` suffisent pour ce projet)
- [`@dnd-kit`](https://dndkit.com/) pour le glisser-déposer
- CSS classique par composant (pas de framework CSS)
- [API Découpage administratif](https://geo.api.gouv.fr/) (gouvernement français) pour l'autocomplete de ville

## Lancer le projet en local

```
npm install
npm run dev
```

## Ce que ce projet démontre

- Composants React et communication parent/enfant par props
- Gestion d'état avec `useState` (formulaires contrôlés, listes dynamiques immutables via `map`/`filter`)
- Effets de bord avec `useEffect` (synchronisation avec le `localStorage`, appel API avec anti-rebond/"debounce")
- Composition de composants (un aiguilleur `CVPreview` qui choisit entre plusieurs modèles)
- Intégration d'une librairie tierce (`@dnd-kit`)
- CSS d'impression (`@media print`) pour générer un PDF propre depuis une page web
