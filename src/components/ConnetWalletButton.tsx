import { useState } from "react"

import Popup from "./Popup"
import ConnectWallet from "./ConnectWallet"

const ConnnectWalletButton: React.FC = () => {

  const [toggle, setToggle] = useState(false)

  return (
    <>
      <div 
        onClick={() => setToggle(true)}
        className="border hover:bg-gray-900 border-white border-solid rounded-lg px-6 text-center text-base cursor-pointer" >
          <span className="text-white text-xl md:text-4xl">
              0xas..819
          </span>
      </div>
      <Popup toggle={toggle} setToggle={setToggle} showClosed={true}>
          <ConnectWallet />
      </Popup>
    </>
  )
}

export default ConnnectWalletButton