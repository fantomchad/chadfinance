import tw from 'twin.macro'
import Stake from '../farms/stake'

import { ethers, providers } from "ethers"
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import InitialPool from '../../../types/InitialPool'
import Farm from '../../../types/Farm'
import getUpdatedPrices from '../../../helpers/getUpdatedPrices'
import getInitialPools from '../../../helpers/getInitialPools'

interface FarmsProps {
    initialFarms: Farm[]
    tokenPrices: Map<string, ethers.BigNumber>
}

const Farms: React.FC<FarmsProps> = ({ initialFarms, tokenPrices }) => {
    const [farms, setFarms] = useState<Farm[]>(initialFarms)
    const [prices, setPrices] = useState<Map<string, ethers.BigNumber>>(tokenPrices)

    useEffect(() => {
        setFarms(initialFarms)
        setPrices(tokenPrices)
    }, [initialFarms, tokenPrices])

    return (
        <div tw="py-4 px-6 flex flex-shrink-0 flex-wrap items-center justify-evenly">
            {
                farms.map((item, index) => (
                    <div key={index}>
                        <Stake basicInfo={item.basicInfo} initialPool={item.pool as InitialPool} prices={prices} />
                    </div>
                ))
            }
        </div>
    )
}

export default Farms
