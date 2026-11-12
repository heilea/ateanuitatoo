import LightRays from '../reactbits/LightRays'
import SplashCursor from '../reactbits/SplashCursor'
import Noise from '../reactbits/Noise'
import { BACKGROUND_PHOTO } from '../../data/site'
import { COLORS } from '../../data/theme'
import { isLiteDevice } from '../../lib/motion'
import './Background.css'

// Photo de fond, voile sombre, rayons de lumière et encre qui suivent la souris
export function Background() {
  // Mode allégé : pas de fumée (elle suit une souris) et rayons en définition réduite
  const lite = isLiteDevice()

  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="bg-photo" style={{ backgroundImage: `url(${BACKGROUND_PHOTO})` }} />
        <div className="bg-shade" />
        <div className="bg-rays">
          <LightRays
            raysOrigin="top-right"
            raysColor={COLORS.light}
            raysSpeed={0.8}
            lightSpread={0.9}
            rayLength={2.4}
            haze={0.3}
            followMouse
            mouseInfluence={0.2}
            noiseAmount={0.05}
            distortion={0.04}
            maxDevicePixelRatio={lite ? 1 : 2}
          />
        </div>
      </div>

      {/* zIndex 5 : au-dessus du fond, sous les photos et les textes */}
      {!lite && <SplashCursor
        rainbow={false}
        colors={[COLORS.beige, COLORS.brown, COLORS.cream]}
        intensity={0.7}
        size={1}
        force={1}
        swirl={3}
        trail={3}
        momentum={1.6}
        clickSplash
        zIndex={5}
      />}
    </>
  )
}

// Grain filmique, par-dessus tout le site
export function Grain() {
  return <Noise fixed opacity={0.07} blendMode="overlay" zIndex={60} />
}
