import Head from 'next/head'
import tw from 'twin.macro'
import Counter from "../components/pages/home/counter"
import SocialIcon from "../components/social"

import Nav from '../components/nav'

export default function Data() {
    return (
        <div tw="font-family[tempest] height[100vh] md:hidden">
            <Head>
                <title>Data | Chad Finance</title>
                <meta name="description" content="Chad Finance" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div tw="h-full flex flex-col background-color[#004FCE]">
                <Nav />


                <div tw="flex flex-col h-full justify-between font-family[tempest] py-8">
                    {/* top */}
                    <div tw="flex flex-col items-center justify-around  space-y-2">
                        {/* featured image */}
                        <div tw=" mb-12">
                            <img tw="w-full" src="/assets/images/heroimage.svg" alt="" />
                        </div>

                        {/* Values */}

                        <div tw="flex flex-col items-center justify-around space-y-3 ">
                            <span tw="text-xl text-white">Fucking TVL</span>
                            <Counter value="$12,000,000.00" />
                            <span tw=" mt-4 text-xl text-white">Fucking $Chad Burnt</span>
                            <Counter value="120,000.00" />
                        </div>

                    </div>

                    <div tw="">
                        <SocialIcon />
                    </div>
                </div>
            </div>

        </div>
    )
}