import getFtmPrice from './getFtmPrice'
import { ethers } from 'ethers'
const WFTM_ADDRESS = "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
const CHAD_ADDRESS = "0xCcE93540b80ABF71B66E0a44fd71E322cE9C4D9e"

const getFarmDetails = async (pools) => {
  console.log("Getting farm details")
  console.log("pools", pools)
  const ftmPrice = await getFtmPrice()
  
  const chadPrice = getChadPrice(pools, ftmPrice)
  const modifiedPools = []

  pools.forEach(pool => {
    pool.liquidity = calculateTvl(pool, ftmPrice, chadPrice)
    pool.apy = calculateApy(pool, chadPrice)
    modifiedPools.push(Object.assign({}, pool))
  })

  return modifiedPools
}

function getChadPrice(pools, ftmPrice) {
  const chadFtmPool = pools.find(pool => isFtmChadPool(pool))

  const ftmAmount = getTokenAmount(chadFtmPool, WFTM_ADDRESS)
  const chadAmount = getTokenAmount(chadFtmPool, CHAD_ADDRESS)

  const ftmPriceBigNumber = new ethers.utils.BigNumber((ftmPrice * 10 ** 18).toString())
  const ftmValue = ftmAmount.mul(ftmPriceBigNumber)

  const chadPriceBigNumber = ftmValue.div(chadAmount)

  return ethers.utils.formatUnits(chadPriceBigNumber, 18)
}

function isFtmChadPool(pool) {
  return pool?.tokens.includes(WFTM_ADDRESS) && pool.tokens.includes(CHAD_ADDRESS)
}

function getTokenAmount(pool, address): ethers.utils.BigNumber {
  const tokenIndex = pool.tokens.indexOf(address)

  if (tokenIndex == 0) {
    return pool.q0
  } else {
    return pool.q1
  }
}

function calculateTvl(pool, ftmPrice, chadPrice) {
  if (pool.tokens.includes(WFTM_ADDRESS)) {
    const ftmAmount = getTokenAmount(pool, WFTM_ADDRESS)
    const ftmAmountAsString = ethers.utils.formatUnits(ftmAmount, 18)
    const ftmAmountAsNumber = parseFloat(ftmAmountAsString)
    const ftmValue = ftmAmountAsNumber * ftmPrice

    return ftmValue * 2//ftmAmount * ftmPrice * 2
  } else if (pool.tokens.includes(CHAD_ADDRESS)) {
    const chadAmount = getTokenAmount(pool, CHAD_ADDRESS)
    const chadAmountAsString = ethers.utils.formatUnits(chadAmount, 18)
    const chadAmountAsNumber = parseFloat(chadAmountAsString)
    const chadValue = chadAmountAsNumber * chadPrice
    
    return chadValue * 2
  }

  return 0
}

function calculateApy(pool, chadPrice) {

}

export default getFarmDetails
