import { ethers } from "ethers"
import Token from "./Token"

class LpToken extends Token {
  token0: ethers.Contract
  q0: ethers.BigNumber
  token1: ethers.Contract
  q1: ethers.BigNumber
  stakingAddress: string 

  constructor(
    address: string, name: string, symbol: string, totalSupply: ethers.BigNumber, decimals: number, 
    staked: ethers.BigNumber, balanceInUserWallet: ethers.BigNumber, contract: ethers.Contract, tokens: string[], 
    token0: ethers.Contract, q0: ethers.BigNumber, token1: ethers.Contract, q1: ethers.BigNumber, stakingAddress: string
  ) {
    super(address, name, symbol, totalSupply, decimals, staked, balanceInUserWallet, contract, tokens)
    this.token0 = token0
    this.q0 = q0
    this.token1 = token1
    this.q1 = q1
    this.stakingAddress = stakingAddress
  }
}

export default LpToken