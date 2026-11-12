import './Hud.css'

const pad = (v) => String(v).padStart(2, '0')

// Compteur "02 — 08" et indication de défilement, masquée après la première action
export default function Hud({ current, total, showHint }) {
  return (
    <>
      <div className="counter"><b>{pad(current + 1)}</b> — {pad(total)}</div>
      <p className={'hint' + (showHint ? '' : ' off')}>Scroll · ↑ ↓</p>
    </>
  )
}
