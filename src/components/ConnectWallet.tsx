import { useWallet } from 'use-wallet'

const ConnectWallet: React.FC = () => {
    const wallet = useWallet()

    return (
        <div className="flex flex-col py-4 bg-white opacity-100 border-4 rounded-xl border-black text-black" >
            <span className="border-b-2 border-black text-center" >Connect Wallet</span>
            <div
                onClick={() => wallet.connect()} 
                className="flex items-center justify-between border-b-2 cursor-pointer bg-white text-black hover:bg-black hover:text-white border-black p-2">
                <span className="w-52 leading-5 text-center ">Connect Via Metamask</span>
                <img className="w-12" src="/icons/metamask.svg" alt="Metamask logo" />
            </div>
            <div className="flex items-center justify-between border-b-2 border-black p-2 cursor-pointer text-black bg-white hover:bg-black hover:text-white">
                <span className="w-52 leading-5 text-center ">Connect Via Trustwallet</span>
                <img className="w-12" src="/icons/trustwallet.svg" alt="Trust Wallet logo" />
            </div>
            <div className="pt-12 pr-2 flex justify-end opacity-30">
                <img className="w-32" src="/icons/CHADLarge.svg" alt="Chad portrait" />
            </div>
        </div>
    )
}

export default ConnectWallet
