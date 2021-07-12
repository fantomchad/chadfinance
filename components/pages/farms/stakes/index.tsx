import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { stakesdata } from '../../../../pages/farms/stakes.data'
import Farm from '../../../../types/Farm'
import InitialPool from '../../../../types/InitialPool'
import SingleStake from '../singlestake'

interface FarmsProps {
    initialFarms: Farm[]
    tokenPrices: Map<string, ethers.BigNumber>
}

const Stakes: React.FC<FarmsProps> = ({ initialFarms, tokenPrices}) => {
    const [farms, setFarms] = useState<Farm[]>(initialFarms)
    const [prices, setPrices] = useState<Map<string, ethers.BigNumber>>(tokenPrices)

    useEffect(() => {
        setFarms(initialFarms)
        setPrices(tokenPrices)
    }, [initialFarms, tokenPrices])

    return (
        <div tw="p-4 flex flex-shrink-0 flex-wrap items-center justify-evenly">
            {
                farms.map((item, index) => (
                    <SingleStake key={index} initialPool={item.pool as InitialPool} basicInfo={item.basicInfo} prices={prices} />
                ))
            }
        </div>
    )
}

export default Stakes
