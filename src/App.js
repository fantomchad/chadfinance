import { UseWalletProvider } from 'use-wallet'
import ChadRouter from './components/ChadRouter';

function App() {
  return (
    <UseWalletProvider
    chainId={250}
    >
      <ChadRouter />
  </UseWalletProvider>
  )
}

export default App