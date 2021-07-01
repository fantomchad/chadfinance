import React from 'react';
import { useWallet } from 'use-wallet'
import WalletBalance from '../components/WalletBalance'

const Home: React.FC = () => {
  const wallet = useWallet()

  return (
    <>
      <h1>Wallet</h1>
      {wallet.status === 'connected' ? (
        <div>
          <button onClick={() => wallet.reset()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.connect()}>MetaMask</button>
        </div>
      )}
      <WalletBalance />
    </>
  )
}

export default Home;