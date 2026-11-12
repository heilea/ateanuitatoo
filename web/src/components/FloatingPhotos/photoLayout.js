import { isMobile } from '../../lib/motion'
import { rnd, pick, shuffle } from '../../lib/random'

// Calcule, pour `count` photos, une taille, une position d'arrivée (tx, ty)
// et un point de départ hors-champ (sx, sy), tous tirés au hasard.
export function computePhotoLayout(count) {
  const W = innerWidth
  const H = innerHeight
  const mobile = isMobile()

  // Zone libre pour les photos : à droite de la liste des projets, sous l'en-tête
  const x0 = mobile ? W * 0.42 : Math.min(W * 0.5, 560) * 0.72
  const x1 = W - 16
  const y0 = 80
  const y1 = H - 50

  // La zone est découpée en cases ; chaque photo prend une case différente
  const cols = mobile ? 2 : 3
  const rows = mobile ? 3 : 2
  const cellW = (x1 - x0) / cols
  const cellH = (y1 - y0) / rows
  const base = mobile ? 140 : Math.max(230, Math.min(W * 0.21, 340))
  const total = Math.min(count, cols * rows)
  const cells = shuffle([...Array(cols * rows).keys()]).slice(0, total)

  return cells.map((cell) => {
    const w = base * rnd(0.9, 1.2)
    const h = w * pick([1.25, 1, 0.8])
    const cx = x0 + ((cell % cols) + 0.5) * cellW + rnd(-0.25, 0.25) * cellW
    const cy = y0 + (Math.floor(cell / cols) + 0.5) * cellH + rnd(-0.25, 0.25) * cellH

    // Départ hors-champ, par un bord au hasard
    const edge = Math.floor(Math.random() * 4)

    return {
      w,
      h,
      tx: Math.max(x0 - 20, Math.min(x1 - w, cx - w / 2)),
      ty: Math.max(y0, Math.min(y1 - h, cy - h / 2)),
      sx: edge === 1 ? W + 80 : edge === 3 ? -w - 80 : rnd(0, W),
      sy: edge === 0 ? -h - 80 : edge === 2 ? H + 80 : rnd(0, H),
    }
  })
}
