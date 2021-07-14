import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import tw from 'twin.macro'
import Nav from '../../components/nav'
import Hero from '../../components/pages/farms/hero'
import Farms from '../../components/pages/farms'
import Stakes from '../../components/pages/farms/stakes'
import SocialIcon from "../../components/social"
import getInitialPools from '../../helpers/getInitialPools'
import Farm from '../../types/Farm'
import InitialPool from '../../types/InitialPool'
import getDummyPools from '../../helpers/getDummyPools'
import getUpdatedPrices from '../../helpers/getUpdatedPrices'
import { ethers } from 'ethers'
import { stakesdata } from '../../data/stakes.data'
import farmsdata from '../../data/farms.data'


const FarmPage: React.FC = () => {
    const { account } = useWeb3React()
    const [farms, setFarms] = useState<Farm[]>(getDummyPools(farmsdata))
    const [singleFarms, setSingleFarms] = useState<Farm[]>(getDummyPools(stakesdata))
    const [prices, setPrices] = useState<Map<string, ethers.BigNumber>>()

    useEffect(() => {
        if (account) {
            console.log("Starting to get initial pools")
            getInitialPools().then(initialPools => {
                console.log("Got initial pools")

                const initialFarms = farms.map(farm => mapInitialPoolToFarm(farm, initialPools))
                const initialSinglePools = singleFarms.map(farm => mapInitialPoolToFarm(farm, initialPools))
                setFarms(initialFarms)
                setSingleFarms(initialSinglePools)

                const tokens = initialPools.map(p => p.stakedToken)
                getUpdatedPrices(tokens).then(prices => {
                    setPrices(prices)
                })
            })
        }
    }, [account])

    const mapInitialPoolToFarm = (farm: Farm, pools: InitialPool[]): Farm => {
        const farmStakeToken = farm.basicInfo.lpTokenAddress.toLowerCase()
        const farmPool = pools.find(pool => pool.stakedToken.address.toLowerCase() === farmStakeToken)
        farm.pool = farmPool
        return farm
    }

    const [isStake, setStake] = useState(false)
    return (
        <div tw="font-family[Tempest] min-h-screen max-h-screen">
            <Head>
                <title>Farms | Chad Finance</title>
                <meta name="description" content="Chad Finance" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="preload"
                    href="/assets/fonts/tempestapacheexpandital.ttf"
                    as="font"
                    crossOrigin=""
                />
            </Head>

            <div tw="background-color[#004FCE]">
                <Nav />

                <div tw=" pb-4 md:py-12 md:px-24 md:bg-gray-300">

                    <div tw="md:bg-white rounded-3xl flex flex-col items-center md:px-8 pt-12">

                        <Hero />

                        {/* Buttons */}
                        <div tw="flex background-color[#004FCE] border-2 border-blue-300 rounded-lg md:p-1 md:text-3xl mt-8">
                            <div css={[
                                tw`px-6 py-1  rounded cursor-pointer`,
                                !isStake && tw`bg-white`
                            ]}
                                onClick={() => setStake(false)}
                            >
                                FARMS
                            </div>
                            <div css={[
                                tw`px-6 py-1  rounded cursor-pointer`,
                                isStake && tw`bg-white`
                            ]}
                                onClick={() => setStake(true)}
                            >
                                STAKE
                            </div>
                        </div>

                        {/* stakes */}

                        {!isStake && <Farms initialFarms={farms} tokenPrices={prices} />}
                        {isStake && <Stakes initialFarms={singleFarms} tokenPrices={prices} />}
                    </div>
                    <div tw="-mt-12 md:hidden">
                        <SocialIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  FarmPage