import BlurText from '../reactbits/BlurText'
import DecryptedText from '../reactbits/DecryptedText'

// Un nom de projet. Quand il est sélectionné, le nom et la zone du corps s'animent.
export default function ProjectWheelItem({ project, active, onSelect }) {
  return (
    <div
      className={'item' + (active ? ' active' : '')}
      role="button"
      tabIndex={0}
      aria-current={active ? 'true' : undefined}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }}
    >
      {active ? (
        <BlurText
          text={project.name}
          animateBy="letters"
          trigger="load"
          direction="bottom"
          delay={28}
          stepDuration={0.22}
          distance={18}
          className="name"
        />
      ) : (
        <span className="name">{project.name}</span>
      )}

      <span className="sub">
        {active && <DecryptedText text={project.sub} animateOn="view" sequential speed={45} />}
      </span>
    </div>
  )
}
