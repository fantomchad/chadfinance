import tw from 'twin.macro'
import Stake from '../farms/stake'
import farmsdata from './farms.data'
import { ethers, providers } from "ethers"
import { useEffect, useState } from 'react'
import getPools from '../../../helpers/getPools'
import { useWeb3React } from '@web3-react/core'
import Pool from '../../../types/Pool'
import Farm from '../../../types/Farm'

function Farms() {
    const { account } = useWeb3React()
    const [farms, setFarms] = useState<Farm[]>([])

    useEffect(() => {
        if (account) {
            getPools(account).then(pools => {
                const currentFarms = farms
                console.log(pools)
                const updatedFarms = currentFarms.map(farm => {
                    const farmStakeToken = farm.basicInfo.lpTokenAddress.toLowerCase()
                    const farmPool = pools.find(pool => pool.stakedToken.address.toLowerCase() === farmStakeToken)
                    farm.pool = farmPool
                    return farm
                })

                setFarms(updatedFarms)
            })
        } else {
            setFarms(getDummyPools())
        }
    }, [account])

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
                pool: {
                    stakedToken: null,
                    tvl: -1,
                    apr: -1,
                    allocationPoints: -1,
                    pendingRewardsForUser: -1,
                    usersDeposit: -1,
                    fee: -1
                }
            })
        }

        return dummyPools
    }

    return (
        <div tw="py-4 px-6 flex flex-shrink-0 flex-wrap items-center justify-evenly">
            {
                farms.map((item, index) => (
                    <div key={index}>
                        <Stake basicInfo={item.basicInfo} pool={item.pool} />
                    </div>
                ))
            }
        </div>
    )
}

export default Farms
