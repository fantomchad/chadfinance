import tw from "twin.macro"
import { useState } from "react"
import Popup from "../../../popup"
import StakeLp from "../../../stakelp"

function Stake({ farm }) {

    const [toggle, setToggle] = useState(false)
    const [current, setCurrent] = useState(farm)

    return (

        <div tw="flex  flex-col border-width[6px] bg-white border-color[#004FCE] space-y-2 box-shadow[0px 0px 9px 3px rgba(0,0,0,0.75)] p-2 rounded-3xl mb-16">
            {/* Farm Logos  */}
            <div tw="flex items-center justify-center">
                <div tw="flex items-center">
                    <img src={`/assets/images/farms/` + current.first + `.svg`} alt="" />
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
            <span tw="text-blue-700 text-3xl text-center px-2">{current.title} LP</span>

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
                    LIQUIDITY: ${current.liquidity}
                </span>
            </div>

            <span tw="text-blue-700 text-2xl"> {current.earn} earned</span>

            <div tw="flex justify-between">
                <span tw="text-xl">{current.earned}</span>
                <div tw=" flex items-center justify-center cursor-pointer text-white text-center border-2 border-color[#004FCE] background-color[#004FCE] py-1 px-8 rounded-lg hover:(bg-white color[#004FCE]) md:border-4">
                    Harvest
                </div>
            </div>

            <span tw="text-blue-700 text-xl"> {current.title} LP staked</span>

            <div tw="px-2">
                {!current.approved &&
                    <div tw=" flex items-center justify-center cursor-pointer width[100%] font-size[20px] text-white border-2 border-color[#004FCE] background-color[#004FCE] py-1 px-2 md:px-8 rounded-lg hover:(bg-white color[#004FCE]) md:border-4">
                        Approve Contract
                    </div>
                }
                {current.approved &&
                    <div tw="flex items-center justify-between text-4xl">
                        <span>0</span>
                        <div tw="flex text-5xl leading-8 text-left space-x-2 hover:text-black">
                            <div tw="flex text-white border-4 cursor-pointer border-color[#004FCE]  background-color[#004FCE] hover:color[#004FCE] hover:bg-white py-1 pl-2 pr-3 rounded-lg" onClick={() => setToggle(true)}>
                                <span>+</span>
                            </div>
                            <div tw="flex text-white border-4 cursor-pointer border-color[#004FCE]  background-color[#004FCE] hover:color[#004FCE] hover:bg-white py-1 pl-2 pr-3 rounded-lg" onClick={() => setToggle(true)}>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Popup toggle={toggle} setToggle={setToggle}>
                <StakeLp setToggle={setToggle} />
            </Popup>
        </div>

    )
}

export default Stake
