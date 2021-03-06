import { Web3Provider } from '@ethersproject/providers'

function getWeb3Provider(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default getWeb3Provider