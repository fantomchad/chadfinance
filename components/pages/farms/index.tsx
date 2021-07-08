import tw from 'twin.macro'
import Stake from '../farms/stake'
import { farmsdata } from './farms.data'
import getLpTokenInfo from '../../../helpers/getLPTokenInfo'
import { ethers, providers } from "ethers"
import { useEffect, useState } from 'react'
import getFarmDetails from '../../../helpers/getFarmDetails'


function Farms() {
    const [pools, setPools] = useState(farmsdata)

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const lpTokensInfos = []

        const getTokensCalls = farmsdata.map(async (f) => {
            const info = await getLpTokenInfo(f.lpTokenAddress, provider)
            lpTokensInfos.push(info)
        })

        Promise.all(getTokensCalls).then(async () => {
            const poolsWithTvlAndApr = await getFarmDetails(lpTokensInfos)
            console.log("Modified pools")
            console.log(poolsWithTvlAndApr)
            setPools(poolsWithTvlAndApr)
        })
    }, [])

    return (
        <div tw="py-4 px-6 flex flex-shrink-0 flex-wrap items-center justify-evenly">
            {
                pools.map((item, index) => (
                    <Stake key={index} farm={item} />
                ))
            }
        </div>
    )
}

export default Farms
