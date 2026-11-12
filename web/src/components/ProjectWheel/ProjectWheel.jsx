import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ProjectWheelItem from './ProjectWheelItem'
import { isMobile, prefersReducedMotion } from '../../lib/motion'
import './ProjectWheel.css'

const itemHeight = () => (isMobile() ? 60 : innerHeight < 700 ? 66 : 84)

// Liste verticale des projets : le projet sélectionné est au centre, les autres s'éloignent
export default function ProjectWheel({ projects, current, onSelect }) {
  const n = projects.length
  const items = useRef([])
  const state = useRef({ pos: 0 })
  // Distance la plus courte entre deux positions, la liste tournant en boucle
  const wrap = (d) => ((((d + n / 2) % n) + n) % n) - n / 2

  const render = () => {
    const h = itemHeight()
    items.current.forEach((li, i) => {
      if (!li) return
      const d = wrap(i - state.current.pos)
      const a = Math.abs(d)
      if (a > 4.2) { li.style.visibility = 'hidden'; return }
      li.style.visibility = 'visible'
      // La liste "recule" vers la gauche quand on s'éloigne de la sélection
      const x = -(1 - Math.cos(Math.min(a, 3.5) * 0.5)) * 240
      const scale = 1 - 0.08 * Math.min(a, 3) + 0.3 * Math.max(0, 1 - a)
      li.style.transform = `translate(${x}px, calc(-50% + ${d * h}px)) scale(${scale})`
      li.style.opacity = Math.max(0, 1 - a * 0.27)
    })
  }

  useEffect(() => {
    render()
    addEventListener('resize', render)
    return () => removeEventListener('resize', render)
  }, [])

  useEffect(() => {
    const s = state.current
    const tween = gsap.to(s, {
      pos: s.pos + wrap(current - s.pos),
      duration: prefersReducedMotion() ? 0 : 0.7,
      ease: 'power3.out',
      overwrite: true,
      onUpdate: render,
      onComplete: () => { s.pos = ((s.pos % n) + n) % n; render() },
    })
    return () => tween.kill()
  }, [current])

  return (
    <nav className="wheel" aria-label="Work">
      <ul>
        {projects.map((project, i) => (
          <li key={project.folder} ref={(el) => { items.current[i] = el }}>
            <ProjectWheelItem
              project={project}
              active={i === current}
              onSelect={() => onSelect(i)}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
