import { Background, Grain } from './components/Background/Background'
import Header from './components/Header/Header'
import FloatingPhotos from './components/FloatingPhotos/FloatingPhotos'
import ProjectWheel from './components/ProjectWheel/ProjectWheel'
import Hud from './components/Hud/Hud'
import Lightbox from './components/Lightbox/Lightbox'
import { useCallback, useState } from 'react'
import { useProjectNavigation } from './hooks/useProjectNavigation'
import { PROJECTS } from './data/projects'

export default function App() {
  const [zoomed, setZoomed] = useState(null)
  const closeZoom = useCallback(() => setZoomed(null), [])
  const { current, select, touched } = useProjectNavigation(PROJECTS.length, !zoomed)

  return (
    <div className="app">
      <Background />
      <Header />
      <FloatingPhotos projects={PROJECTS} current={current} onOpen={setZoomed} />
      <ProjectWheel projects={PROJECTS} current={current} onSelect={select} />
      <Hud current={current} total={PROJECTS.length} showHint={!touched} />
      {zoomed && <Lightbox photo={zoomed} onClose={closeZoom} />}
      <Grain />
    </div>
  )
}
