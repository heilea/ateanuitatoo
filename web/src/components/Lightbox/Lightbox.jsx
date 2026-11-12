import { useEffect, useState } from 'react'
import './Lightbox.css'

// Photo agrandie au premier plan. Se ferme au clic ou avec Échap.
export default function Lightbox({ photo, onClose }) {
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.alt} onClick={onClose}>
      {missing ? (
        // Cadre de remplacement tant que la vraie photo n'est pas là
        <div className="lightbox-ph" style={{ '--hue': photo.hue }}>{photo.label}</div>
      ) : (
        <img src={photo.src} alt={photo.alt} draggable={false} onError={() => setMissing(true)} />
      )}
      <button className="lightbox-close" type="button" aria-label="Close" onClick={onClose}>Close</button>
    </div>
  )
}
