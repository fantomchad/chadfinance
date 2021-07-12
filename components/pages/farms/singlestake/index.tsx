import tw from "twin.macro"
import { useEffect, useState } from "react"
import Popup from "../../../popup"
import StakeSingle from "../../../stakeSingle"
import { useWeb3React } from '@web3-react/core'
import { ethers, providers } from "ethers"





function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

export function Stake({ farm }) {

    const { account, active } = useWeb3React()

    const [toggle, setToggle] = useState(false)
    const [depositMode, setDepositMode] = useState(false)
    const [current, setCurrent] = useState(farm)
    const [liquidity, setLiquidity] = useState(0)
    const [lpTokenName, setLpTokenName] = useState('')
    const [getLPText, setGetLPText] = useState(" ")




    const getLPInfo = async () => {
        if (active) {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const chadMaster = '0xDA094Ee6bDaf65c911f72FEBfC58002e5e2656d1'

            const chadMasterABI = [{ "inputs": [{ "internalType": "contract ChadFinanceToken", "name": "_CHAD", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }, { "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CHAD", "outputs": [{ "internalType": "contract ChadFinanceToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ChadPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingChad", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IBEP20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accChadPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeAddress", "type": "address" }], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
            const chadMasterContract = new ethers.Contract(chadMaster, chadMasterABI, provider);

            // CHAD EARNED
            const chadEarned = await chadMasterContract.pendingChad(current.pid, account)
            const formatBal = ethers.utils.formatUnits(chadEarned, 18)
            console.log(current.pid, ':', formatBal)
            const roundedEarnedBal = parseFloat(formatBal).toFixed(3)
            current.earned = roundedEarnedBal

            //Code to check the token allowance
            const lpAbi = [{ "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
            const lpContract = new ethers.Contract(current.lpTokenAddress, lpAbi, provider)
            const approved = await lpContract.allowance(account, chadMaster)
            const formatapprove = ethers.utils.formatUnits(approved, 18)

            //Enable Approve contract button, we do this so that when we switch wallets the approve button is reset.
            current.approved = false

            //Check if allowance is more than 0, if >0 then disable "approve contract" button
            if (parseFloat(formatapprove) > 0) {
                current.approved = true
            }
            // console.log('approved:', current.pid, formatapprove)

            // LP Staked 
            let lpStaked = await chadMasterContract.userInfo(current.pid, account).then(amount => {
                let formattedLPStaked = ethers.utils.formatUnits(amount.amount, 18)
                var roundedBal = parseFloat(formattedLPStaked).toFixed(2)
                let abbreviated = numFormatter(roundedBal)

                if (abbreviated > 0 && abbreviated < 0.001) {
                    let smallValue = '< 0.001'
                    current.staked = smallValue
                } else {
                    current.staked = abbreviated

                }
            })

            //Update the farms data
            setCurrent(Object.assign({}, current))
        }
    }

    useEffect(() => {
        getLPInfo()
    }, [active, account])

    useEffect(() => {
        console.log("Updatinng liquidity")
        setLiquidity(farm.liquidity)
    }, [farm])

    const harvestRewards = async () => {
        if (active) {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const chadMaster = '0xDA094Ee6bDaf65c911f72FEBfC58002e5e2656d1'

            const chadMasterABI = [{ "inputs": [{ "internalType": "contract ChadFinanceToken", "name": "_CHAD", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }, { "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CHAD", "outputs": [{ "internalType": "contract ChadFinanceToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ChadPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingChad", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IBEP20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accChadPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeAddress", "type": "address" }], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

            const chadMasterContract = new ethers.Contract(chadMaster, chadMasterABI, provider);
            const chadMasterWithSigner = chadMasterContract.connect(signer)
            let tx = await chadMasterWithSigner.deposit(current.pid, 0)
            tx.wait().then(() => {
                getLPInfo()
                console.log('tx confirmed, updating farms')
            })
        }
    }

    const approveFarm = async () => {
        if (active) {
            console.log('poo')

            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            const chadMaster = '0xDA094Ee6bDaf65c911f72FEBfC58002e5e2656d1'

            const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
            const address = current.lpTokenAddress

            const contract = new ethers.Contract(address, abi, provider);
            const contractWithSigner = contract.connect(signer)
            let tx = await contractWithSigner.approve(chadMaster, ethers.utils.parseEther("10000000"))


            tx.wait().then(() => {
                console.log('approved')
                current.approved = true
                setCurrent(Object.assign({}, current))
            })
        }
        console.log('pee')
    }

    return (

        <div tw="flex  flex-col justify-evenly flex-grow md:flex-grow-0 width[330px] md:width[350px] md:height[520px]  border-width[6px] bg-white border-color[#004FCE] space-y-2 box-shadow[0px 0px 9px 3px rgba(0,0,0,0.75)] px-4 py-4 rounded-3xl mb-16">
            {/* Farm Logos  */}
            <div tw="flex items-center justify-center">
                <div tw="flex items-center ">
                    <img tw="" src={`/assets/images/farms/` + current.first + `.svg`} alt="" />
                    <img tw="-ml-4" src={`/assets/images/farms/` + current.second + `.svg`} alt="" />
                </div>
            </div>

            <div tw="flex items-center justify-center space-x-2 text-center text-white text-lg">
                <div tw=" background-color[#004FCE] w-32 py-1 px-8 rounded-lg">
                    HOT🔥
                </div>
                <div tw=" background-color[#004FCE] w-32 py-1  px-8 rounded-lg">
                    {current.multiplier}X
                </div>
            </div>
            <span tw="truncate text-blue-700 text-3xl text-center px-2">{current.first}-{current.second} LP</span>

            <div tw="flex flex-col -space-y-2 text-lg">
                <span>
                    APY: {current.apy}%
                </span>
                <span>
                    EARN: {current.earn}
                </span>
                <span>
                    DEPOSIT FEE: {current.fee}% <br />
                </span>
                <span>
                    LIQUIDITY: ${liquidity.toFixed(2)}
                </span>
            </div>

            <span tw="text-blue-700 text-2xl"> {current.earn} earned</span>

            <div tw="flex justify-between">
                <span id="chadEarned" tw="text-xl">{current.earned}</span>
                <div
                    onClick={harvestRewards}
                    tw=" flex items-center justify-center cursor-pointer text-white text-center border-2 border-color[#004FCE] background-color[#004FCE] py-1 px-8 rounded-lg hover:(bg-white color[#004FCE]) md:border-4">
                    Harvest
                </div>
            </div>

            <span tw="text-blue-700 text-xl"> {current.first}-{current.second} LP staked</span>

            <div tw="">
                {!current.approved &&
                    <div
                        onClick={approveFarm}
                        tw=" flex items-center justify-center cursor-pointer width[100%] font-size[20px] text-white border-2 border-color[#004FCE] background-color[#004FCE] py-1  rounded-lg hover:(bg-white color[#004FCE]) md:border-4">
                        Approve Contract
                    </div>
                }
                {current.approved &&
                    <div tw="flex items-center justify-between text-4xl">
                        <span>{current.formattedStaked}</span>
                        <div tw="flex text-5xl leading-8 text-left space-x-2 hover:text-black">
                            <div tw="flex text-white border-4 cursor-pointer border-color[#004FCE]  background-color[#004FCE] hover:color[#004FCE] hover:bg-white py-1 pl-2 pr-3 rounded-lg" onClick={() => {
                                setToggle(true) 
                                setDepositMode(true)
                            
                            }}>
                                <span>+</span>
                            </div>
                            <div tw="flex text-white border-4 cursor-pointer border-color[#004FCE]  background-color[#004FCE] hover:color[#004FCE] hover:bg-white py-1 pl-2 pr-3 rounded-lg" onClick={() => {
                                setToggle(true)
                                setDepositMode(false)
                                }}>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Popup toggle={toggle} setToggle={setToggle}>
                <StakeSingle 
                setToggle={setToggle} 
                FarmData={current} 
                toggle={toggle} 
                depositMode={depositMode} 
                getLPText={getLPText}
                getLPInfo={getLPInfo} />
            </Popup>
        </div>

    )
}

export default Stake
