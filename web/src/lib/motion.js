// Largeur sous laquelle on passe en mise en page mobile (voir aussi les @media des CSS)
export const MOBILE_WIDTH = 700

export const isMobile = () => innerWidth < MOBILE_WIDTH

export const prefersReducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches

// Téléphones et tablettes : on allège les effets pour garder le site fluide
export const isLiteDevice = () =>
  isMobile() || matchMedia('(pointer: coarse)').matches
