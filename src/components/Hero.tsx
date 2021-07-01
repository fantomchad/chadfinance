import Button from "./Button"

const Hero: React.FC = () => {
  const widthStyle = {
    width: "30%"
  }

  

  return (
    <div>
      <div className="md:flex flex-col items-center hidden">
        <img className="z-10" src="/images/CHAD2.svg" alt="Chad" />
        <Button 
          text="FUCKING BUY CHAD" 
          link="https://exchange.paintswap.finance/#/swap?outputCurrency=0xCcE93540b80ABF71B66E0a44fd71E322cE9C4D9e" 
          isExternalLink={true}
          styleOnHover={{backgroundColor: "#004FCE", color: "#FFFFFF", borderColor: "black"}}
          styleWithoutHover={{backgroundColor: "#FFFFFF", color: "black", borderColor: "black"}}
          styleClasses="flex text-7xl flex-col items-center border-4 cursor-pointer bg-white rounded-3xl px-24 py-8 -mt-24" 
          />
      </div>

      <div className="flex flex-col space-y-6 text-lg leading-6 tracking-tighter text-white z-20 absolute top-16 left-8" style={widthStyle}>
        <h1 className="text-5xl text-center">TOKENOMICS</h1>
        <span>
          55% pre-sale <br /> 30% liquidity <br /> 10% marketing & dev fund <br /> 5% airdrop
        </span>
        <span className="pr-12">
          .69 Chad is minted each block, the farms have a deposit fee which is used to buyback and burn Chad
        </span>
      </div>

      <div className="flex flex-col space-y-6 2xl:text-3xl text-2xl text-center text-white z-20 absolute top-16 right-8 leading-8 tracking-tighter" style={widthStyle}>
        <h1 className="text-5xl ">What is CHAD?</h1>

        <span className="text-2xl">
          Chad is a yield farming token on Fantom Opera created to help provide liquidity to other meme tokens, a launch pad, and support farming pools for new projects.
        </span>
      </div>
    </div >
  )
}

export default Hero
