import { useEffect, useRef } from 'react'
import { computePhotoLayout } from './photoLayout'
import { flyIn, popOut, wiggle, settle } from './photoMotion'
import { projectPhoto } from '../../data/site'
import { PLACEHOLDER_HUES } from '../../data/theme'
import { RANDOM_PHOTOS } from '../../data/projects'
import { prefersReducedMotion } from '../../lib/motion'
import { shuffle } from '../../lib/random'
import './FloatingPhotos.css'

const SPAWN_DELAY = 280 // ms : laisse les photos précédentes disparaître

let zTop = 1

// Crée les éléments d'une photo ; affiche un cadre neutre si l'image manque
function createPhoto(project, index, slot, hue, onOpen) {
  const el = document.createElement('div')
  const float = document.createElement('div')
  const frame = document.createElement('div')
  el.className = 'photo'
  float.className = 'photo-float'
  frame.className = 'photo-frame'
  frame.style.width = slot.w + 'px'
  frame.style.height = slot.h + 'px'
  frame.style.setProperty('--hue', hue)

  const img = new Image()
  img.alt = project.name + ', photo ' + index
  img.draggable = false
  img.addEventListener('error', () => {
    frame.classList.add('ph')
    frame.dataset.label = 'Photo ' + index
  })
  img.src = projectPhoto(project, index)

  // Clic : agrandit la photo au premier plan
  el.addEventListener('click', () => {
    onOpen({ src: img.src, alt: img.alt, label: 'Photo ' + index, hue })
  })

  el.addEventListener('mouseenter', () => {
    el.style.zIndex = ++zTop
    wiggle(frame)
  })
  el.addEventListener('mouseleave', () => settle(frame))

  frame.appendChild(img)
  float.appendChild(frame)
  el.appendChild(float)
  return { el, float, frame }
}

// Photos du projet sélectionné : elles arrivent du hors-champ, flottent,
// puis "pop" quand on change de projet.
export default function FloatingPhotos({ projects, current, onOpen }) {
  const root = useRef(null)
  const live = useRef([])
  // Gardé dans une ref pour ne pas relancer les photos quand le parent se redessine
  const open = useRef(onOpen)
  open.current = onOpen

  useEffect(() => {
    const project = projects[current]
    const hue = PLACEHOLDER_HUES[current % PLACEHOLDER_HUES.length]
    const delay = prefersReducedMotion() ? 0 : SPAWN_DELAY

    const spawn = () => {
      // Numéros des photos du dossier (1, 2, 3…), mélangés si RANDOM_PHOTOS
      const numbers = Array.from({ length: project.count }, (_, i) => i + 1)
      const picks = RANDOM_PHOTOS ? shuffle(numbers) : numbers
      computePhotoLayout(project.count).forEach((slot, k) => {
        const photo = createPhoto(project, picks[k], slot, hue, (photo) => open.current?.(photo))
        root.current.appendChild(photo.el)
        live.current.push(photo)
        flyIn(photo, slot, k)
      })
    }

    const clear = () => {
      live.current.forEach(popOut)
      live.current = []
    }

    let timer = setTimeout(spawn, delay)
    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        clear()
        clearTimeout(timer)
        timer = setTimeout(spawn, delay)
      }, 250)
    }
    addEventListener('resize', onResize)

    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      removeEventListener('resize', onResize)
      clear()
    }
  }, [projects, current])

  return <div className="photos" ref={root} />
}
