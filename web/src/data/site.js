// Liens et chemins du site
export const INSTAGRAM_URL = 'https://www.instagram.com/ateanuitattoo/'
export const DM_URL = 'https://ig.me/m/ateanuitattoo'

const IMAGES = import.meta.env.BASE_URL + 'images/'

// Photo de fond : public/images/fond.jpg
export const BACKGROUND_PHOTO = IMAGES + 'fond.jpg'

// Photo n° `index` (à partir de 1) d'un projet : public/images/<folder>/<index>.jpg
export const projectPhoto = (project, index) => IMAGES + project.folder + '/' + index + '.jpg'
