import { useState } from "react"

import { Link } from "react-router-dom"

interface ButtonProps {
  text: string
  link: string
  isExternalLink?: boolean
  styleOnHover?: ButtonStyle
  styleWithoutHover?: ButtonStyle
  styleClasses?: string
}

interface ButtonStyle {
  backgroundColor: string
  color: string
  borderColor: string
  width?: string
}

const defaultButtonWithoutHoverStyle = {
  backgroundColor: "#004FCE",
  color: "#FFFFFF",
  borderColor: "#FFFFFF",
  width: "100%"
}

const defaultButtonHoverStyle = {
  backgroundColor: "#FFFFFF",
  color: "#004FCE",
  borderColor: "#FFFFFF"
}

const Button: React.FC<ButtonProps> = ({ text, link, isExternalLink=false, styleOnHover=null, styleWithoutHover=null, styleClasses="" }) => {
  const [hover, setHover] = useState(false)

  const style = styleWithoutHover || defaultButtonWithoutHoverStyle
  const hoverStyle = styleOnHover || defaultButtonHoverStyle
  
  return (
      <div 
        className={styleClasses.length > 0 ? styleClasses : "border-2 border-white flex justify-center items-center rounded-xl py-2 px-3 text-2xl text-white"}
        style={hover ? hoverStyle : style}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
          {isExternalLink ?
            <a href={link} target="_blank" rel="noreferrer">
              {text}
            </a>
            :
            <Link to={link}>
                {text}
            </Link>
          }
      </div>
  )
}

export default Button
