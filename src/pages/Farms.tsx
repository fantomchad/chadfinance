import React from 'react';
import { useWallet } from 'use-wallet'
import WalletBalance from '../components/WalletBalance'

const Home: React.FC = () => {
  const wallet = useWallet()

  return (
    <>
      <h1>Farms</h1>
    </>
  )
}

export default Home;