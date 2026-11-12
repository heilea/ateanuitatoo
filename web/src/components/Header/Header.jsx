import SplitText from '../reactbits/SplitText'
import ShinyText from '../reactbits/ShinyText'
import { INSTAGRAM_URL, DM_URL } from '../../data/site'
import { COLORS } from '../../data/theme'
import './Header.css'

export default function Header() {
  return (
    <header className="top">
      <span className="logo">
        <SplitText
          text="Ateanui"
          tag="span"
          className="word"
          splitType="chars"
          trigger="load"
          textAlign="left"
          delay={70}
          duration={0.9}
        />
        <span className="tag">TATTOO</span>
      </span>

      <nav className="links">
        <a className="insta" href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram</a>
        <a className="dm" href={DM_URL} target="_blank" rel="noopener">
          <ShinyText text="Book via DM" color={COLORS.cream} shineColor={COLORS.beige} speed={3} />
        </a>
      </nav>
    </header>
  )
}
