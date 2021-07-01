import { useState } from "react"
import { useWallet } from 'use-wallet'

import Popup from "./Popup"
import ConnectWallet from "./ConnectWallet"

const ConnnectWalletButton: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const wallet = useWallet()

  let addressShort = ""
  if (wallet.status === 'connected') {
    addressShort = wallet.account.substring(0, 4) + ".." + wallet.account.substring(39)
  }

  return (
    <>
      <div 
        onClick={() => setToggle(true)}
        className="border hover:bg-gray-900 border-white border-solid rounded-lg px-6 text-center text-base cursor-pointer" >
          <span className="text-white text-xl md:text-4xl">
            {wallet.status === 'connected' ? addressShort : "Connect"}
          </span>
      </div>
      <Popup toggle={toggle} setToggle={setToggle} showClosed={true}>
          <ConnectWallet />
      </Popup>
    </>
  )
}

export default ConnnectWalletButton