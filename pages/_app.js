import { GlobalStyles } from 'twin.macro'
import '../styles/globals.css'
import { Web3ReactProvider } from '@web3-react/core'
import getWeb3Provider from '../helpers/web3/getWeb3Provider'

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function MyApp({ Component, pageProps }) {

console.log(getErrorMessage)

  return (
    <>
      <Web3ReactProvider getLibrary={getWeb3Provider}>
        <GlobalStyles />
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>)
}

export default MyApp
