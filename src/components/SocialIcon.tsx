import { useState } from "react"

interface IconData {
  name: string
  link: string
}

interface SocialIconProps {
  isMobile: boolean
  iconData: IconData
  icon: React.ReactNode
}

const SocialIcon: React.FC<SocialIconProps> = ({ isMobile, iconData, icon }) => {
  const [hover, setHover] = useState(false)

  const desktopBackground = {
    backgroundColor: `${hover ? "black" : "#004FCE"}`
  }

  const hoverClasses = "bg-black text-white"
  const iconClasses = isMobile ? 
    `p-2 rounded-full flex fill-current items-center justify-center w-11 h-11 ${hover ? hoverClasses : "bg-white"}`:
    `p-2 rounded-full flex fill-current items-center justify-center text-white w-11 h-11 ${hover ? hoverClasses : ""}` 
  const containerClasses = isMobile ? "flex flex-row justify-center space-x-4 md:hidden" : "md:flex flex-col space-y-4 hidden fill-current"
  
  return (
    <div className={containerClasses}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
          <a href={iconData.link}>
              <div className={iconClasses} style={isMobile ? {} : desktopBackground}>
                  {icon}
              </div>
          </a>
      </div>
    </div>
  )
}

export default SocialIcon
