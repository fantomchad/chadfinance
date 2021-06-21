import React from 'react'
import { stakesdata } from './stakes.data'
import SingleStake from '../singlestake'
function Stakes() {
    return (
        <div tw="p-4 flex flex-shrink-0 flex-wrap items-center justify-evenly">
            {
                stakesdata.map((item, index) => (
                    <SingleStake key={index} farm={item} />
                ))
            }
        </div>
    )
}

export default Stakes
