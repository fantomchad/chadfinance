import { ethers } from "ethers"

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

  constructor(address: string, name: string, symbol: string, totalSupply: ethers.BigNumber, decimals: number, staked: ethers.BigNumber, balanceInUserWallet: ethers.BigNumber, contract: ethers.Contract, tokens: string[]) {
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
}

export default Token

