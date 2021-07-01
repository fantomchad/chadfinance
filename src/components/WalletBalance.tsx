import React from 'react';
import { useWallet } from 'use-wallet'

const WalletBalance: React.FC = () => {
  const wallet = useWallet()

  return (
    <>
      <h2>Wallet status</h2>
      {wallet.status === 'connected' ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Balance: {wallet.balance}</div>
        </div>
      ) : (
        <div>
          Not connnected
        </div>
      )}
    </>
  )
}

export default WalletBalance;