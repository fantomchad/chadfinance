import { ethers } from "ethers"
import getTokenBalance from "../helpers/getTokenBalance"

class Token {
  address: string
  name: string
  symbol: string
  totalSupply: ethers.BigNumber
  decimals: number
  stakedOnFarm: ethers.BigNumber
  balanceInUserWallet: ethers.BigNumber
  contract: ethers.Contract
  tokens: string[]

  constructor(
    address: string, 
    name: string, 
    symbol: string, 
    totalSupply: ethers.BigNumber, 
    decimals: number, 
    staked: ethers.BigNumber = ethers.BigNumber.from(0), 
    balanceInUserWallet: ethers.BigNumber = ethers.BigNumber.from(0), 
    contract: ethers.Contract,
    tokens: string[]
    ) {
      this.address = address
      this.name = name
      this.symbol = symbol
      this.totalSupply = totalSupply
      this.decimals = decimals
      this.stakedOnFarm = staked
      this.balanceInUserWallet = balanceInUserWallet
      this.contract = contract
      this.tokens = tokens
  }

  getTvl(prices: Map<string, ethers.BigNumber>): string {
    const tokenPrice = prices.get(this.tokens[0].toLowerCase())
    const tokenAmount = this.stakedOnFarm

    return ethers.utils.formatUnits(tokenPrice.mul(tokenAmount))
  }

  async getUpdated(userWalletAddress): Promise<Token> {
    const CHAD_MASTER_ADDRESS = "0xDA094Ee6bDaf65c911f72FEBfC58002e5e2656d1"
    const updatedStakeAmount = await getTokenBalance(this.contract, CHAD_MASTER_ADDRESS)
    const updatedBalanceInUserWallet =  await getTokenBalance(this.contract, userWalletAddress)

    return new Token(
      this.address, 
      this.name, 
      this.symbol, 
      this.totalSupply, 
      this.decimals, 
      updatedStakeAmount,
      updatedBalanceInUserWallet, 
      this.contract, 
      this.tokens)
  }
}

export default Token

