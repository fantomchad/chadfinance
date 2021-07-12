import tw from 'twin.macro'
import Stake from '../farms/stake'
import farmsdata from './farms.data'
import { ethers, providers } from "ethers"
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import InitialPool from '../../../types/InitialPool'
import Farm from '../../../types/Farm'
import Pool from '../../../types/Pool'
import getUpdatedPrices from '../../../helpers/getUpdatedPrices'
import getInitialPools from '../../../helpers/getInitialPools'

function Farms() {
    const { account } = useWeb3React()
    const [farms, setFarms] = useState<Farm[]>([])
    const [prices, setPrices] = useState<Map<string, ethers.BigNumber>>()


    useEffect(() => {
        if (account) {
            console.log("Starting to get initial pools")
            getInitialPools().then(initialPools => {
                console.log("Got initial pools")

                const initialFarms = farms.map(farm => mapInitialPoolToFarm(farm, initialPools))
                setFarms(initialFarms)

                const tokens = initialPools.map(p => p.stakedToken)
                getUpdatedPrices(tokens).then(prices => {
                    setPrices(prices)
                })
            })
        } else {
            setFarms(getDummyPools())
        }
    }, [account])

    const mapInitialPoolToFarm = (farm: Farm, pools: InitialPool[]): Farm => {
        const farmStakeToken = farm.basicInfo.lpTokenAddress.toLowerCase()
        const farmPool = pools.find(pool => pool.stakedToken.address.toLowerCase() === farmStakeToken)
        farm.pool = farmPool
        return farm
    }

    const getDummyPools = (): Farm[] => {
        const dummyPools = []
        for (const farm of farmsdata) {
            dummyPools.push({
                basicInfo: {
                    first: farm.first,
                    second: farm.second,
                    approved: farm.approved,
                    earn: farm.earn,
                    pid: farm.pid,
                    lpTokenAddress: farm.lpTokenAddress
                },
                pool: new InitialPool(null, -1, farm.pid, -1, null)
            })
        }

        return dummyPools
    }

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
