import gsap from 'gsap'
import { rnd } from '../../lib/random'
import { prefersReducedMotion } from '../../lib/motion'

// Chaque photo a trois niveaux, animés séparément pour ne pas se gêner :
//   el    → entrée et sortie (position, rotation, échelle)
//   float → flottement permanent
//   frame → réaction au survol

// Arrivée depuis le hors-champ, puis flottement
export function flyIn({ el, float }, slot, order) {
  const reduced = prefersReducedMotion()
  gsap.set(el, { x: slot.sx, y: slot.sy, rotation: rnd(-120, 120), scale: 0.6 })
  gsap.to(el, {
    x: slot.tx,
    y: slot.ty,
    rotation: rnd(-12, 12),
    scale: 1,
    duration: reduced ? 0 : rnd(0.9, 1.4),
    delay: reduced ? 0 : order * 0.09,
    ease: 'back.out(1.1)',
    onComplete: () => idle(float),
  })
}

// Petit mouvement permanent, en boucle, différent pour chaque photo
function idle(float) {
  if (prefersReducedMotion()) return
  const move = () => gsap.to(float, {
    x: rnd(-14, 14),
    y: rnd(-14, 14),
    rotation: rnd(-4, 4),
    duration: rnd(1.6, 3),
    ease: 'sine.inOut',
    onComplete: move,
  })
  move()
}

// La photo "pop" puis est retirée de la page
export function popOut({ el, float, frame }, order) {
  const reduced = prefersReducedMotion()
  gsap.killTweensOf([el, float, frame])
  gsap.to(el, {
    scale: 0,
    rotation: '+=' + rnd(-60, 60),
    opacity: 0,
    duration: reduced ? 0 : 0.3,
    delay: reduced ? 0 : order * 0.03,
    ease: 'back.in(2)',
    onComplete: () => el.remove(),
  })
}

// Survol : petit wiggle
export function wiggle(frame) {
  gsap.killTweensOf(frame)
  gsap.timeline()
    .to(frame, { scale: 1.1, rotation: -3, duration: 0.14, ease: 'power2.out' })
    .to(frame, { rotation: 3, duration: 0.14 })
    .to(frame, { rotation: 0, duration: 0.22 })
}

export function settle(frame) {
  gsap.killTweensOf(frame)
  gsap.to(frame, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' })
}
