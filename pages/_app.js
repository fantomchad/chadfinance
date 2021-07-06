import { GlobalStyles } from 'twin.macro'
import '../styles/globals.css'
import { Web3ReactProvider } from '@web3-react/core'
import getWeb3Provider from '../helpers/web3/getWeb3Provider'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Web3ReactProvider getLibrary={getWeb3Provider}>
        <GlobalStyles />
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>)
}

export default MyApp
