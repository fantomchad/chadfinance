import { ethers } from "ethers";
import { useState, useEffect } from 'react'



// export function UserWallet() {
//     let user = "not connected"

//     if (window.ethereum) {
//         ethereum.enable()
//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         user = window.ethereum.selectedAddress
//     }
//     else {

//     }
//     return (
//             user
//         )
// }


export default async function ConnectMetamask() {
    let provider = null

    if (window.ethereum) {
        ethereum.enable()
        provider = new ethers.providers.Web3Provider(window.ethereum)
        alert(provider)

    } else {
        alert("Metamask not detected")
    }

    // if (provider != null) {
    //     let user_wallet = window.ethereum.selectedAddress;
    //     var walletOutput = user_wallet.substring(0, 5)
    //     console.log(walletOutput)
    //     document.getElementById("user_wallet").textContent = walletOutput;
    // }
}



