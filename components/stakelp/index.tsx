import tw from "twin.macro"
import { useWeb3React } from '@web3-react/core'
import { ethers, providers } from "ethers"
import { useState } from "react"
import { farmsdata } from "../pages/farms/farms.data"



// const sendEth = async () => {

//     //@ts-ignore
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const signer = provider.getSigner()
//     const tx = signer.sendTransaction({
//         to: "0x000",
//         value: ethers.utils.parseEther("1.0")

//     });
// }

function StakeLp({ setToggle, FarmData }) {

    const { account, active } = useWeb3React()
    let [lpTokenBalance, setLpTokenBalance] = useState('')

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()



    const checkbal = async () => {
        if (active) {

            //@ts-ignore
            const lpAddress = FarmData.lpTokenAddress
            const minABI = [{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "type": "function" }]

            const lpContract = new ethers.Contract(lpAddress, minABI, provider);
            let balance = await lpContract.balanceOf(account)
            let formatBal = ethers.utils.formatUnits(balance, 18)
            setLpTokenBalance(formatBal)
            // lpBalance = formatBal
            var roundedBal = parseFloat(formatBal).toFixed(3)
            //@ts-ignore
            document.getElementById("lpBalance").innerText = roundedBal
            document.getElementById("lpinfo").innerText = ' LP Available'
        }
        else {
            //@ts-ignore
            // document.getElementById("lpBalance").innerText = 'not connected'
        }
    }
    checkbal()

    const maxLP = async () => {
        if (active) {
            //@ts-ignore
            document.getElementById("inputAmt").value = lpTokenBalance
        }
        else {
            // Do something?
            alert('Wallet not connected')
        }
    }

    const chadMaster = '0xDA094Ee6bDaf65c911f72FEBfC58002e5e2656d1'
    const chadMasterABI = [{ "inputs": [{ "internalType": "contract ChadFinanceToken", "name": "_CHAD", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }, { "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CHAD", "outputs": [{ "internalType": "contract ChadFinanceToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ChadPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingChad", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IBEP20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accChadPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeAddress", "type": "address" }], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
    const chadMasterContract = new ethers.Contract(chadMaster, chadMasterABI, provider);



    const depositLP = async () => {
        if (active) {
            const chadMasterWithSigner = chadMasterContract.connect(signer)
            //@ts-ignore
            if (document.getElementById("inputAmt").value > lpTokenBalance){
                alert('Cannot deposit more than available')

            }else{
                //@ts-ignore
                let tx = chadMasterWithSigner.deposit(FarmData.pid, ethers.utils.parseUnits(document.getElementById("inputAmt").value, 18))
                setToggle(false)

            }

        } else {
            alert('wallet not connected')
            setToggle(false)
        }
    }


    return (
        <div tw=" flex flex-col px-2 py-4 bg-white space-y-6 opacity-100 border-4 rounded-xl background-color[#004FCE] border-white" >
            <span tw="border-b-2 border-white text-center text-3xl text-white" >Stake LP TOKENS</span>
            <div>
                <div tw="flex items-center rounded px-2 w-full relative bg-white">
                    <input id="inputAmt" placeholder="FTM-Chad LP" tw=" text-right px-2 appearance-none outline-none  py-2.5" type="text" />
                    <div
                        onClick={maxLP}
                        tw=" cursor-pointer top-1.5 right-2 text-xl border-2 rounded px-2 border-color[#004FCE] hover:(background-color[#004FCE] text-white)">
                        <span>Max</span>
                    </div>
                </div>
                <div tw="text-white text-right mt-2">
                    <span id="lpBalance">wallet Not Connected</span>
                    <span id="lpinfo"></span>
                </div>
            </div>
            <div tw="flex items-center justify-center cursor-pointer text-white fill-current hover:text-black">

                <span tw=" text-center text-xl mr-2">Get FTM-CHAD LP</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4778 0.00707915L13.7143 1.50069C13.3792 1.55216 13.3016 1.78893 13.5408 2.02667L14.7978 3.27372C15.0375 3.51146 15.0375 3.90067 14.7978 4.13792L7.7523 11.1281C7.51258 11.3658 7.51258 11.7555 7.7523 11.9928L11.9117 16.1197C12.1514 16.3574 12.5439 16.3574 12.7836 16.1197L19.8291 9.12955C20.0688 8.8918 20.4612 8.8918 20.701 9.12955L21.9579 10.3766C22.1971 10.6143 22.4354 10.5374 22.4873 10.2045L23.9929 0.518349C24.0443 0.185999 23.8129 -0.0439008 23.4778 0.00707915Z" />
                    <path d="M17.412 19.3716C17.412 20.5539 16.4422 21.5167 15.25 21.5167H4.66551C3.47331 21.5167 2.50353 20.5539 2.50353 19.3716V8.87119C2.50353 7.68787 3.47331 6.72562 4.66551 6.72562H10.5746L13.0782 4.24231H4.66551C2.09278 4.24231 0 6.31827 0 8.87119V19.3716C0 21.924 2.09278 24 4.66551 24H15.25C17.8223 24 19.9155 21.924 19.9155 19.3716V11.0172L17.412 13.501V19.3716Z" />
                </svg>

            </div>
            <div tw="flex justify-around">
                <div tw="bg-white rounded px-6 cursor-pointer hover:(bg-black text-white)" onClick={() => setToggle(false)} >
                    Cancel
                </div>
                <div tw="bg-white rounded px-6 cursor-pointer hover:(bg-black text-white)" onClick={depositLP}>
                    Confirm
                </div>
            </div>
        </div>
    )
}

export default StakeLp