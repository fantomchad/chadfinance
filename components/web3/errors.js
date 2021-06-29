// export default function getErrorMessage(error) {
//     if (error instanceof NoEthereumProviderError) {
//       return (
//       alert('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.')
//       )
//     } else if (error instanceof UnsupportedChainIdError) {
//       return alert("You're connected to an unsupported network.")
//     } else if (
//       error instanceof UserRejectedRequestErrorInjected ||
//       error instanceof UserRejectedRequestErrorWalletConnect ||
//       error instanceof UserRejectedRequestErrorFrame
//     ) {
//       return alert('Please authorize this website to access your Ethereum account.')
//     } else {
//       console.error(error)
//       return 'An unknown error occurred. Check the console for more details.'
//     }
//   }

  
// const ethEnabled = async () => {
//     if (ethereum) {
//       await window.ethereum.send('eth_requestAccounts');
//       window.web3 = new Web3(window.ethereum);
//       return true;
//     }
//     return false;
//   }