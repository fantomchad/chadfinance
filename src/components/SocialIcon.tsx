import { useState } from "react"

interface IconData {
  name: string
  link: string
}

interface SocialIconProps {
  isMobile: boolean
  iconData: IconData
  icon: React.ReactNode
  index: number
}

const SocialIcon: React.FC<SocialIconProps> = ({ isMobile, iconData, icon, index }) => {
  const [hover, setHover] = useState(false)

  const hoverClasses = "bg-black text-white"
  const iconClasses = isMobile ? 
    `p-2 rounded-full flex fill-current items-center justify-center w-11 h-11 ${hover ? hoverClasses : "bg-white"}`:
    `p-2 text-white rounded-full flex fill-current items-center justify-center  w-11 h-11 ${hover ? hoverClasses : ""}` 
  const containerClasses = isMobile ? "flex flex-row justify-center space-x-4 md:hidden" : "md:flex flex-col space-y-4 hidden fill-current"
  
  return (
    <div className={containerClasses}>
      <div key={index}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
          <a href={iconData.link}>
              <div className={iconClasses}>
                  {icon}
              </div>
          </a>
      </div>
    </div>
  )
}

export default SocialIcon
