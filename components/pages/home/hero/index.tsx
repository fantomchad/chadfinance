import tw from "twin.macro"
import Counter from "../counter"
import SocialIcon from "../../../social"

function HeroSection() {
    return (
        <div tw="flex relative flex-1 items-center justify-center  py-12 px-24 bg-gray-300">
            <div tw="background-color[#004FCE] rounded-3xl h-full w-full font-family[tempest] py-8">
                {/* top */}
                <div tw="flex items-center">
                    {/* featured image */}
                    <div tw="flex flex[2]">
                        <img src="/assets/images/heroimage.svg" alt="" />
                    </div>

                    {/* Values */}
                    <div tw="flex flex-1 items-start -ml-96">
                        <div tw="flex items-center  flex-col">
                            <span tw="text-3xl text-white">Fucking TVL</span>
                            <Counter value="$12,000,000.00" />
                            <span tw="text-3xl text-white">Fucking $Chad Burnt</span>
                            <Counter value="120,000.00" />
                        </div>
                    </div>
                </div>
                {/* bottom */}
                <div tw="flex flex-col items-center">
                    <span tw="text-9xl text-white">CHAD</span>
                    <span tw="-mt-12 font-size[76px] text-white"> FINANCE</span>
                    <div tw="flex items-end -mt-6 -mr-24">
                        <img src="/assets/images/fantom1.png" alt="" />
                    </div>
                </div>

            </div>
            <div tw="absolute right-6 top-12 hidden md:block">
                <SocialIcon />
            </div>
        </div>
    )
}

export default HeroSection
