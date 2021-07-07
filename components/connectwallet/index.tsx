import tw from "twin.macro"
import { useState, useEffect } from "react"
import { useWeb3React } from '@web3-react/core'

import { FantomConnector } from '../../connectors/FantomConnector'
import { useEagerConnect } from '../../hooks/useEagerConnect'
import { InjectedConnector } from "@web3-react/injected-connector"

const ConnectWallet: React.FC = () => {

    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context
    const [activatingConnector, setActivatingConnector] = useState<InjectedConnector | undefined>(undefined)
    // const [account, setActivatingConnector] = useState("")

    const triedEager = useEagerConnect()
    
    const currentConnector = FantomConnector
    const activating = currentConnector === activatingConnector
    const connected = currentConnector === FantomConnector
    const disabled = !triedEager || !!activatingConnector || connected || !!error
    // const disabled =  !!activatingConnector || connected || !!error

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
          setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    const connectWallet = () => {
        setActivatingConnector(currentConnector)
        activate(FantomConnector)
    }

    return (
        <div tw=" flex flex-col py-4 bg-white opacity-100 border-4 rounded-xl border-black" >
            <span tw="border-b-2 border-black text-center" >Connect Wallet</span>
            <div
                onClick={connectWallet} 
                tw="flex items-center justify-between border-b-2 cursor-pointer bg-white hover:bg-black hover:text-white border-black p-2">
                <span tw="w-52 leading-5 text-center">Connect Via Metamask</span>
                <img tw="w-12" src="/assets/icons/metamask.svg" alt="" />
            </div>
            <div tw="flex items-center justify-between border-b-2 border-black p-2 cursor-pointer bg-white hover:bg-black hover:text-white">
                <span tw="w-52 leading-5 text-center ">Connect Via Trustwallet</span>
                <img tw="w-12" src="/assets/icons/trustwallet.svg" alt="" />
            </div>
            <div tw="pt-12 pr-2 flex justify-end opacity-30">
                <img tw="w-32" src="/assets/icons/CHADLarge.svg" alt="" />
            </div>
        </div>
    )
}

export default ConnectWallet