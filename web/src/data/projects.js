// Un projet = une ligne de la liste + un dossier de photos.
// Les photos se rangent dans public/images/<folder>/1.jpg, 2.jpg, 3.jpg…
// `count` est le nombre de photos du dossier.
export const PROJECTS = [
  { name: 'Forearm', sub: '6 pieces', folder: 'forearm', count: 6 },
  { name: 'Calf', sub: '5 pieces', folder: 'calf', count: 5 },
  { name: 'Sleeve', sub: '5 pieces', folder: 'sleeve', count: 5 },
  { name: 'Back', sub: '5 pieces', folder: 'back', count: 5 },
  { name: 'Hand', sub: '4 pieces', folder: 'hand', count: 4 },
  { name: 'Leg', sub: '6 pieces', folder: 'leg', count: 6 },
]

// Quand un dossier contient plus de photos que de cartes affichées
// (6 sur ordinateur) :
//   true  = tirage au hasard à chaque sélection, toutes les photos finissent par passer
//   false = toujours les premières (1.jpg, 2.jpg, 3.jpg…)
export const RANDOM_PHOTOS = true
