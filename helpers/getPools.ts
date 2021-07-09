import { Contract, ethers } from "ethers"
import LpToken from "../types/LpToken";
import Pool from "../types/Pool";
import Token from "../types/Token";
import getFtmPrice from "./getFtmPrice";

const CHAD_MASTER_ABI = [{ "inputs": [{ "internalType": "contract ChadFinanceToken", "name": "_CHAD", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }, { "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CHAD", "outputs": [{ "internalType": "contract ChadFinanceToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ChadPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingChad", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IBEP20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accChadPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeAddress", "type": "address" }], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ChadPerBlock", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const CHAD_MASTER_ADDRESS = "0xDA094Ee6bDaf65c911f72FEBfC58002e5e2656d1"
const CHAD_TOKEN_ADDRESS = "0xcce93540b80abf71b66e0a44fd71e322ce9c4d9e"

const UNI_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const ERC20_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

const getPools = async (userWalletAddress: string): Promise<Pool[]> => {
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const chadMasterContract = new ethers.Contract(CHAD_MASTER_ADDRESS, CHAD_MASTER_ABI, provider)
  
  const poolCount = await getPoolCount(chadMasterContract)
  const pools = await getPoolsFromMasterChad(poolCount, userWalletAddress, chadMasterContract, provider)

  const [poolsWithTvl, prices] = await populateTvls(pools)

  const totalAllocPoints = await getTotalAllocPoints(chadMasterContract)
  const rewardsInYear = await getAnnualRewards(chadMasterContract)
  
  const chadPrice = prices.get(CHAD_TOKEN_ADDRESS.toLowerCase())
  const poolsWithTvlAndApr = populateAprs(poolsWithTvl, chadPrice * rewardsInYear, totalAllocPoints)

  return poolsWithTvlAndApr
}

async function getTotalAllocPoints(masterContract): Promise<number> {
  const totalAllocPointsBigNumber = await masterContract.totalAllocPoint()

  return parseFloat(ethers.utils.formatUnits(totalAllocPointsBigNumber, 0))
}

async function getAnnualRewards(masterContract) {
  const rewardsPerBlock = parseFloat(ethers.utils.formatUnits(await getRewardsPerBlock(masterContract)))

  const secondsInYear = 60 * 60 * 24 * 365 // We make assumption that block time is 1 second.

  return rewardsPerBlock * secondsInYear
}

async function getPoolCount(masterContract): Promise<number> {
  const poolCountBigNumber = await masterContract.poolLength()

  return poolCountBigNumber.toNumber()
}

async function getRewardsPerBlock(masterContract): Promise<number> {
  const rewardsPerBlockBigNumber = await masterContract.ChadPerBlock()

  return rewardsPerBlockBigNumber
}

async function getPoolsFromMasterChad(poolCount, userWalletAddress, masterContract, provider): Promise<Pool[]> {
  const poolPromises = []

  for (let i = 0; i < poolCount; i++) {
    poolPromises.push(await getPoolInfo(i, userWalletAddress, masterContract, provider))
  }
  const poolInfos = await Promise.all(poolPromises)

  return poolInfos
}

async function getPoolInfo(poolIndex, userWalletAddress, masterContract, provider): Promise<Pool> {
  const poolInfo = await masterContract.poolInfo(poolIndex)
  const poolToken = await getToken(poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken, userWalletAddress, provider)
  const userInfo = await masterContract.userInfo(poolIndex, userWalletAddress)
  const pendingRewardTokens = await masterContract.pendingChad(poolIndex, userWalletAddress)
  const staked = userInfo.amount

  const pool: Pool = {
    stakedToken: poolToken,
    tvl: 0,
    apr: 0,
    allocationPoints: parseFloat(ethers.utils.formatUnits(poolInfo.allocPoint, 0)),
    pendingRewardsForUser: pendingRewardTokens,
    usersDeposit: staked
  }

  return pool
}

async function getToken(address, userWalletAddress, provider): Promise<Token | LpToken> {
  try {
    const pool = new ethers.Contract(address, UNI_ABI, provider)
    const _token0 = await pool.token0()
    const uniPool = await getFantomUniPool(pool, address, userWalletAddress, CHAD_MASTER_ADDRESS)
    return uniPool
  }
  catch(err) {
    console.log(err)
  }
  try {
    const erc20 = new ethers.Contract(address, ERC20_ABI, provider)
    const erc20token = await getErc20(erc20, address, userWalletAddress, CHAD_MASTER_ADDRESS)

    return erc20token
  }
  catch(err) {
    console.log(err)
    console.log(`Couldn't match ${address} to any known token type.`)
  }
}

async function getFantomUniPool(pool: ethers.Contract, address: string, userWalletAddress: string, stakingAddress: string): Promise<LpToken> {
  const name = await pool.name()
  const symbol = await pool.symbol()
  const decimals = await pool.decimals()
  const totalSupply = await pool.totalSupply()
  const staked = await pool.balanceOf(stakingAddress)
  const balanceInUserWallet = await pool.balanceOf(userWalletAddress)
  const reserves = await pool.getReserves()
  const q0 = reserves._reserve0
  const q1 = reserves._reserve1
  const token0 = await pool.token0()
  const token1 = await pool.token1()
  return new LpToken(address, name, symbol, totalSupply, decimals, staked, balanceInUserWallet, pool, [token0, token1], token0, q0, token1, q1, stakingAddress)
}

async function getErc20(token: ethers.Contract, address: string, userWalletAddress: string, stakingAddress: string): Promise<Token> {
  const name = await token.name()
  const symbol = await token.symbol()
  const decimals = await token.decimals()
  const totalSupply = await token.totalSupply()
  const staked = await token.balanceOf(stakingAddress)
  const balanceInUserWallet = await token.balanceOf(userWalletAddress)

  return new Token(address, name, symbol, totalSupply, decimals, staked, balanceInUserWallet, token, [address])
}

async function populateTvls(pools: Pool[]): Promise<[Pool[], Map<string, number>]> {
  const ftmPrice = await getFtmPrice()
  const knownPrices = new Map<string, number>()
  knownPrices.set(ftmPrice.tokenAddress, ftmPrice.price)

  knownPrices.forEach((price, tokenAddress) => {
    const lowerCaseAddress = tokenAddress.toLowerCase()
    const poolsWithKnownPrice = pools.filter(pool => pool.tvl === 0 && pool.stakedToken.tokens.map(address => address.toLowerCase()).includes(lowerCaseAddress))

    poolsWithKnownPrice.forEach(pool => {
      if (pool.stakedToken.tokens.length === 1) {
        // Token is single sided farm.
        pool.tvl = parseFloat(ethers.utils.formatUnits(pool.stakedToken.stakedOnFarm)) * knownPrices.get(pool.stakedToken.address.toLowerCase())
      } else {
        // Token is LP farm
        const tokenWithKnownPriceTotalValue = getTokenValue(pool, lowerCaseAddress, price)
        const totalValueOfLpTokens = tokenWithKnownPriceTotalValue * 2 // Since pool has equal value of both tokens

        const stakedOnFarm = parseFloat(ethers.utils.formatUnits(pool.stakedToken.stakedOnFarm))
        const totalSupply = parseFloat(ethers.utils.formatUnits(pool.stakedToken.totalSupply))
        
        const totalValueOfStakedLpTokens = totalValueOfLpTokens * (stakedOnFarm / totalSupply)

        pool.tvl = totalValueOfStakedLpTokens

        const secondaryTokenAddress = pool.stakedToken.tokens[getTokenIndex(pool, lowerCaseAddress) == 0 ? 1 : 0].toLowerCase()
        const secondaryTokenPrice = getSecondaryTokenValue(pool, lowerCaseAddress, tokenWithKnownPriceTotalValue)

        knownPrices.set(secondaryTokenAddress, secondaryTokenPrice)
      }
    })
  })

  return [pools, knownPrices]
}

function getTokenIndex(pool: Pool, tokenAddress: string) {
  return pool.stakedToken.tokens.map(address => address.toLowerCase()).indexOf(tokenAddress)
}

function getTokenValue(pool: Pool, tokenAddress: string, price: number): number {
  const tokenIndex = getTokenIndex(pool, tokenAddress)
  const lpToken = pool.stakedToken as LpToken

  if (tokenIndex === 0) {
    return parseFloat(ethers.utils.formatUnits(lpToken.q0)) * price
  } else {
    return parseFloat(ethers.utils.formatUnits(lpToken.q1)) * price
  }
}

function getSecondaryTokenValue(pool: Pool, primaryTokenAddress: string, totalValueOfPrimaryToken: number): number {
  const tokenIndex = getTokenIndex(pool, primaryTokenAddress)
  const lpToken = pool.stakedToken as LpToken
 
  if (tokenIndex === 0) {
    return totalValueOfPrimaryToken / parseFloat(ethers.utils.formatUnits(lpToken.q1))
  } else {
    return totalValueOfPrimaryToken / parseFloat(ethers.utils.formatUnits(lpToken.q0))
  }
}

function populateAprs(pools: Pool[], totalChadValueInYear: number, totalAllocPoints: number): Pool[] {
  pools.forEach(pool => {
    const rewardsForThisPoolAnnually = totalChadValueInYear * (pool.allocationPoints / totalAllocPoints)
    const apr = rewardsForThisPoolAnnually / pool.tvl * 100

    pool.apr = apr
  })

  return pools
}

export default getPools