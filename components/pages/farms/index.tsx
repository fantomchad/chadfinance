import tw from 'twin.macro'
import Stake from '../farms/stake'
import { farmsdata } from './farms.data'

function Farms() {
    return (
        <div tw="p-4 flex flex-shrink-0 flex-wrap items-center justify-evenly">
            {
                farmsdata.map((item, index) => (
                    <Stake key={index} farm={item} />
                ))
            }
        </div>
    )
}

export default Farms
