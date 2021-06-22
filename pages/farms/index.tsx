import Head from 'next/head'
import { useState } from 'react'
import tw from 'twin.macro'
import Nav from '../../components/nav'
import Hero from '../../components/pages/farms/hero'
import Farms from '../../components/pages/farms'
import Stakes from '../../components/pages/farms/stakes'
import SocialIcon from "../../components/social"


export default function Home() {

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

                        {!isStake && <Farms />}
                        {isStake && <Stakes />}
                    </div>
                    <div tw="-mt-12 md:hidden">
                        <SocialIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}




