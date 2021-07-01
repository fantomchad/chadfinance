import { useState } from "react"

import { Link } from "react-router-dom"

interface ButtonProps {
  text: string
  link: string
  isExternalLink?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, link, isExternalLink = false }) => {
  const [bgColour, setBgColour] = useState("#004FCE")

  const buttonHoverStyle = {
    backgroundColor: `${bgColour}`,
    color: `${bgColour === "#FFFFFF" ? "#004FCE" : "#FFFFFF"}`
  }

  return (
      <div 
        className="border-2 border-white flex justify-center items-center rounded-xl py-2 px-3 text-2xl text-white"
        style={buttonHoverStyle}
        onMouseEnter={() => setBgColour("#FFFFFF")}
        onMouseLeave={() => setBgColour("#004FCE")}>
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
