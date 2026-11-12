import { useEffect, useRef, useState } from 'react'

const WHEEL_COOLDOWN = 380 // ms entre deux crans de molette
const DRAG_STEP = 50 // px de glissement pour avancer d'un projet

// Projet sélectionné + navigation à la molette, au clavier et au glisser
export function useProjectNavigation(count, enabled = true) {
  const [current, setCurrent] = useState(0)
  const [touched, setTouched] = useState(false)
  const lock = useRef(0)

  useEffect(() => {
    // En pause quand une photo est agrandie
    if (!enabled) return undefined

    const step = (dir) => {
      setTouched(true)
      setCurrent((c) => (c + dir + count) % count)
    }

    const onWheel = (e) => {
      e.preventDefault()
      const now = performance.now()
      if (now - lock.current < WHEEL_COOLDOWN || Math.abs(e.deltaY) < 8) return
      lock.current = now
      step(e.deltaY > 0 ? 1 : -1)
    }

    const onKey = (e) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); step(1) }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); step(-1) }
    }

    let dragY = null
    const onDown = (e) => { dragY = e.clientY }
    const onMove = (e) => {
      if (dragY === null) return
      const dy = e.clientY - dragY
      if (Math.abs(dy) > DRAG_STEP) { dragY = e.clientY; step(dy < 0 ? 1 : -1) }
    }
    const onUp = () => { dragY = null }

    addEventListener('wheel', onWheel, { passive: false })
    addEventListener('keydown', onKey)
    addEventListener('pointerdown', onDown)
    addEventListener('pointermove', onMove)
    addEventListener('pointerup', onUp)
    addEventListener('pointercancel', onUp)
    return () => {
      removeEventListener('wheel', onWheel)
      removeEventListener('keydown', onKey)
      removeEventListener('pointerdown', onDown)
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerup', onUp)
      removeEventListener('pointercancel', onUp)
    }
  }, [count, enabled])

  const select = (i) => {
    setTouched(true)
    setCurrent(i)
  }

  return { current, select, touched }
}
