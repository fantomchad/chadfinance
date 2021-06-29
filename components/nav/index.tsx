import tw from "twin.macro"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navdata } from "./nav.data"
import Logo from "../logo"
import Back from "../back"
import Popup from "../popup"
import { ConnectWallet } from "../connectwallet"
import { useState } from "react"
import { useWeb3Context } from '../contexts/web3'
import useAsync from "../useAsync"
import { ConnectMetamask } from "../web3/ConnectWeb3"






function Nav() {
    const router = useRouter()
    const path = router.asPath
    const [toggle, setToggle] = useState(false)



    const { state: { account }, updateAccount } = useWeb3Context()
    // @ts-ignore



    return (
        <div tw="flex justify-between items-center background-color[#004FCE] font-family[Tempest] text-2xl px-4 md:px-8 py-1">
            <div tw="hidden md:block">
                <Logo />
            </div>
            <div tw="md:hidden">
                {path == "/" && <img src="/assets/images/fantomlogo.svg" alt="" />}
                {path != "/" && <Back />}
            </div>
            <div tw="flex items-center ">
                <div tw="flex items-center space-x-6 text-white text-4xl ">
                    {navdata.map((item, index) =>
                        <div tw="md:flex hidden" key={index} >
                            <Link tw="" href={item.tag}>
                                <span
                                    css={
                                        [tw`cursor-pointer`, path == item.tag && tw`text-gray-900`]
                                    }
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </div>
                    )}
                    <div tw="border hover:bg-gray-900 border-white border-solid rounded-lg px-6 text-center text-base cursor-pointer" onClick={() => setToggle(true)}>
                        <span id="user_wallet" tw="text-white text-xl md:text-4xl">
                            {account}
                          
                        </span>
                    </div>
                </div>

            </div>

            <Popup toggle={toggle} setToggle={setToggle} showClosed={true}>
                <ConnectWallet />
            </Popup>

        </div>
    )
}

export default Nav
