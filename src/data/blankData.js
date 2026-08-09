// Contrairement a defaultData.js (le CV d'Antoine, affiche au tout
// premier chargement), celui-ci sert au bouton "Reinitialiser" : un
// visiteur qui veut essayer l'outil avec ses propres infos ne doit pas
// repartir sur les donnees de quelqu'un d'autre.
export const blankData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    age: '',
    location: '',
    photo: null,
  },
  skills: [],
  experiences: [],
  education: [],
}
