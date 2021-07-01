import {CounterDollar, CounterChad} from "./Counter"
import SocialIcons from "./SocialIcons"

import {useFTMBalance, useChadBalance, useTokenBalance } from "../hooks/getTokens" // <- IMPORT IT LIKE THIS
// import useChadBurnt from "../hooks/useTokens"



const HeroSection: React.FC = () => {
  const containerStyles = {
    backgroundColor: "#004FCE",
    fontFamily: "Tempest"
  }



  const balance = useFTMBalance('0x0000000000000000000000000000000000000000') // <- CALL IT LIKE THIS
  let chadBurnt = useChadBalance('0x0000000000000000000000000000000000000001')

  // SET IT TO A VARIABLE. CHECK IF IT'S NULL AND SHOW IT ONLY IF IT'S AVAILABLE
  const TVL = balance ? balance.toString() : "Connect wallet" // <- ADD REAL TVL HERE
  const burned = chadBurnt ? chadBurnt.toString(): "error" //<- ADD BURNED CHAD HERE

  return (
    <div className="flex relative flex-1 items-center justify-center  py-12 px-24 bg-gray-300">
      <div className="rounded-3xl h-full w-full py-8" style={containerStyles}>
        {/* top */}
        <div className="flex items-center">
            {/* featured image */}
            <div className="flex">
                <img src="/images/heroimage.svg" alt="" />
            </div>

            {/* Values */}
            <div className="flex flex-1 items-start -ml-96">
                <div className="flex items-center  flex-col">
                    <span className="text-3xl text-white">Fucking TVL</span>
                    <CounterDollar value={TVL}/> 
                    <span className="text-3xl text-white">Fucking $Chad Burnt</span>
                    <CounterChad value={burned}/>
                </div>
            </div>
        </div>
        {/* bottom */}
        <div className="flex flex-col items-center">
            <span className="text-9xl text-white">CHAD</span>
            <span className="-mt-12 text-white" style={{fontSize: "76px"}}> FINANCE</span>
            <div className="flex items-end -mt-6 -mr-24">
                <img src="/images/fantom1.png" alt="" />
            </div>
        </div>
      </div>
      <div className="absolute right-6 top-12 hidden md:block">
        <SocialIcons />
      </div>
    </div>
  )
}

export default HeroSection
