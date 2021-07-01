import Hero from '../components/Hero'
import MobHero from '../components/MobileHero'
import SocialIcons from '../components/SocialIcons'

const Chad: React.FC = () => {
  const blueBackground = {
    backgroundColor: "#004FCE"
  }

  const containerStyle = {
    fontFamily: "Tempest",
    ...blueBackground
  }


  return (
    <div className="min-h-screen max-h-screen md:bg-white" style={containerStyle}>
      <div className="md:py-12 md:px-32 md:bg-gray-300 relative">
        <div className="md:px-16 md:pt-24 md:bg-white rounded-3xl md:shadow-xl">
          <div className=" pt-8 pb-44 px-8 relative hidden md:block rounded-3xl" style={blueBackground}>
            <Hero />
          </div>
          <div className="flex flex-col w-full md:flex-row items-center justify-around md:px-4 md:pt-32 md:pb-8">
            <div className="LEFT BOTTOM">
              <div className="flex md:items-center md:justify-center pl-4 pr-32 relative">
                <img className="w-full hidden md:block" src="/images/StandingCHAD.svg" alt="Chad standing" />
                <img className="w-full md:hidden" src="/images/StandingCHADLight.svg" alt="Chad standing" />
                <span className="text-3xl absolute text-white w-44 bottom-0 text-center right-0 mr-4 md:hidden">faster cheaper better</span>
              </div>
            </div>

            <div className="LEFT RIGHT BOTTOM">
              <div className="flex flex-col items-center px-4 md:(w-2/3 px-0) text-center space-y-8">
                <span className="text-xl absolute hidden text-white w-44 md:static md:text-black md:text-8xl">faster,cheaper, and better</span>
                <div className="bg-white text-black p-6 md:text-white rounded-3xl md:py-12 md:px-4" style={{maxWidth: "80%", ...blueBackground}}>
                  <span className="text-2xl md:font-size[32px] leading-6 ">CHAD IS BUILT ON FANTOM NETWORK WHICH IS ULTIMATELY FASTER, CHEAPER, AND BETTER THAN BSC AND ETH NETWORK.</span>
                </div>
                <div className="md:flex items-center hidden">
                  <img className="h-24" src="/images/ChadLogo.svg" alt="Chad" />
                </div>
              </div>
            </div>
          </div>

          <MobHero />
        </div>
        <div className="absolute right-12 top-12 hidden md:block ">
          <SocialIcons />
        </div>
      </div>
    </div>
  )
}

export default Chad;