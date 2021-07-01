import React from 'react'

import Button from '../components/Button'
import SocialIcons from '../components/SocialIcons'

const Home: React.FC = () => {
  const homeStyles = {
    fontFamily: "Tempest" 
  }

  return (
    <div className="min-h-screen max-h-screen" style={homeStyles}>

      <div className="flex flex-col">

        {/* desktop  */}
        <div className="hidden md:block">
          {/* <HeroSection /> */}
        </div>

        {/* mobile */}

        <div className="flex flex-col justify-center items-center space-y-6 md:hidden py-2 px-2">
          <div className="flex flex-col items-center justify-between">

            <img className="z-10 w-full md:hidden" src="/images/CHADLight.svg" alt="" />
            <div className=" flex flex-col items-center bg-white text-black rounded-xl py-6 px-2 margin-top[-27px] md:text-white  md:background-color[#004FCE] md:rounded-3xl md:px-24 md:py-8 md:margin-top[-44px]">
              <span className="text-3xl md:text-7xl">WHAT THE FUCK </span>
              <span className=" font-size[22px] tracking-tighter md:text-5xl">DO YOU WANT TO DO TODAY?</span>
            </div>
          </div>

          <div className="flex items-center px-2 space-x-2 ">
            <Button text="DATA" link="/data" />
            <Button text="FARMS" link="/farms" />
            <Button text="ABOUT" link="/chad" />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <img className="w-28" src="/icons/CHADLargeLight.svg" alt="Chad" />
            <Button text="BUY $CHAD" link="https://exchange.paintswap.finance/#/swap?outputCurrency=0xCcE93540b80ABF71B66E0a44fd71E322cE9C4D9e" isExternalLink={true} />
          </div>
          <SocialIcons />
        </div>

      </div>
    </div>
  )
}

export default Home;

{/* <title>Chad Finance</title>
<meta name="description" content="Chad Finance" />
<link rel="icon" href="/favicon.ico" />
<link
  rel="preload"
  href="/assets/fonts/tempestapacheexpandital.ttf"
  as="font"
  crossOrigin="anonymous"
/> */}