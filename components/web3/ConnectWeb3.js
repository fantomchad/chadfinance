import { ethers } from "ethers";
import { useState, useEffect } from 'react'



export async function ConnectMetamask() {
    let provider = null

    if (window.ethereum) {
        await ethereum.enable()
        provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log('llosdsds')

    } else {
        alert("Metamask not detected")
    }
    return { provider, account:0 || "" };

}

export function SubscribeToAccount(
    ethers,
    callback
){
    const id = setInterval(async () => {
        try {
          const accounts = await ethers.providers.Web3Provider(window.ethereum)
          callback(null, accounts);
        } catch (error) {
          callback(error, null);
        }
      }, 1000);
    
      return () => {
        clearInterval(id);
      };
    }


    export function subscribeToNetId(
        web3,
        callback
      ) {
        const id = setInterval(async () => {
          try {
            const netId = await web3.eth.net.getId();
            callback(null, netId);
          } catch (error) {
            callback(error, null);
          }
        }, 1000);
      
        return () => {
          clearInterval(id);
        };
      }