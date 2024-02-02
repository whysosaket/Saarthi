import './Head/Head.css'

const GlitchLogo = (props: {text: string}) => {
  return (
    <div>
         <div className="glitch-wrapper">
            <div className="glitch">{props.text}</div>
        </div>
    </div>
  )
}

export default GlitchLogo