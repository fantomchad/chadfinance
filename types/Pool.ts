import { ethers } from "ethers"
import LpToken from "./LpToken"
import Token from "./Token"

interface Pool {
  stakedToken: Token | LpToken
  tvl: number
  apr: number
  allocationPoints: number
  pendingRewardsForUser: ethers.BigNumber
  usersDeposit: ethers.BigNumber
}

export default Pool