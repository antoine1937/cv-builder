// Donnees affichees au premier chargement. Actuellement remplies avec
// les vraies infos d'Antoine (a la demande) -- la photo n'a pas pu etre
// recuperee automatiquement (elle etait encodee dans un PDF), a ajouter
// a la main via le champ "Photo" du formulaire.
export const defaultData = {
  personal: {
    name: 'Antoine Lupiac',
    title: "Recherche d'alternance en développement web",
    // Facultatif : une ou deux phrases d'intro/resume, affichees sous le
    // titre dans l'apercu. Vide par defaut -- rien ne s'affiche tant que
    // ce n'est pas rempli (voir le rendu conditionnel dans chaque modele).
    summary: '',
    email: 'antoine.lupiac1997@gmail.com',
    phone: '06 28 64 65 37',
    age: '29 ans',
    location: 'Toulouse - 31400',
    photo: null,
  },
  // "items" est une simple chaine de texte (competences separees par des
  // virgules), pas un tableau -- explication dans SkillsForm.jsx : ca
  // evite un bug classique de champ qui "saute" pendant la saisie.
  skills: [
    {
      id: 's1',
      category: 'Langages informatiques',
      items: 'HTML / CSS, JavaScript, Langage C, SQL, PHP, Git / GitHub, VS Code',
    },
    {
      id: 's2',
      category: 'Bureautique',
      items: 'Word, Google Doc, PowerPoint, Google Slide, Excel, Google Sheets',
    },
    {
      id: 's3',
      category: 'Langues',
      items: 'Anglais niveau B2',
    },
    {
      id: 's4',
      category: 'Savoir-faire',
      items:
        "Concevoir une application web, Recueillir et analyser les besoins client, Rédiger un cahier des charges, Maintenance informatique, Veille technologique",
    },
    {
      id: 's5',
      category: 'Savoir-être',
      items: "Autonome, Sens de l'écoute, Travail en équipe, Persévérant, Capacité d'adaptation, Rigoureux",
    },
  ],
  experiences: [
    {
      id: 'e1',
      title: "Apprenti Développeur d'application web",
      company: 'AFPA',
      location: 'Toulouse, France',
      startDate: '2023-09',
      endDate: '2025-07',
      description:
        "Participation au développement et à la maintenance d'applications web : création d'interfaces utilisateur, suivi, modification.",
    },
    {
      id: 'e2',
      title: 'Téléconseiller',
      company: "Caisse Primaire D'assurance Maladie",
      location: 'Toulouse, France',
      startDate: '2021-01',
      endDate: '2021-03',
      description:
        'Appel entrant et sortant, contact tracing brigade covid, suivi des personnes atteintes du covid et de leurs cas contacts.',
    },
    {
      id: 'e3',
      title: 'Employé polyvalent de libre-service',
      company: 'Intermarché',
      location: 'Toulouse, France',
      startDate: '2020-03',
      endDate: '2020-06',
      description: "Préparateur de commande, mise en rayon, caissier, agent d'accueil.",
    },
    {
      id: 'e4',
      title: 'Intérimaire employé polyvalent',
      company: "Société d'Agences et de Diffusion",
      location: 'Toulouse, France',
      startDate: '2019-06',
      endDate: '2019-08',
      description: 'Préparation de commande, opérateur de production, agent de tri.',
    },
    {
      id: 'e5',
      title: 'Agent administratif',
      company: "Caisse Primaire d'Assurance Maladie",
      location: 'Toulouse, France',
      startDate: '2018-10',
      endDate: '2019-02',
      description: 'Réception, tri et archivage du courrier, indexation de différents dossiers.',
    },
    {
      id: 'e6',
      title: 'Stage développeur informatique',
      company: 'Akka Technologie',
      location: 'Blagnac, France',
      startDate: '2017-05',
      endDate: '2017-06',
      description:
        "Stage étudiant, participation à la gestion d'un réseau mobile, maintenance informatique et matériel.",
    },
    {
      id: 'e7',
      title: 'Stage développeur web',
      company: "Caisse Primaire D'assurance Maladie",
      location: 'Toulouse, France',
      startDate: '2016-05',
      endDate: '2016-07',
      description: "Aide à la création de logiciel d'administration.",
    },
  ],
  education: [
    {
      id: 'ed1',
      title: 'Bachelor Développeur Web',
      school: 'ISCOD',
      location: 'Toulouse, France',
      startDate: '2023-09',
      endDate: '2025-07',
      description:
        "En alternance d'une durée de 24 mois, organisée sous la forme de 4 jours en entreprise, 1 jour en formation.",
    },
    {
      id: 'ed2',
      title: 'BTS Système Numérique',
      school: 'Lycée Deodat de Severac',
      location: 'Toulouse, France',
      startDate: '2016-09',
      endDate: '2018-06',
      description:
        "Spécialité électronique et communication. Projet école : élaboration d'un ballon météo avec différents capteurs lancé dans la stratosphère, pour mesurer différentes valeurs (température, humidité, luminosité...).",
    },
    {
      id: 'ed3',
      title: 'Baccalauréat STI2D',
      school: 'Lycée Deodat de Severac',
      location: 'Toulouse, France',
      startDate: '2015-09',
      endDate: '2016-06',
      description: "Spécialité systèmes d'information et numérique.",
    },
  ],
}
