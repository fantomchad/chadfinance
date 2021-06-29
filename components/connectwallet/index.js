import tw from "twin.macro"
import React from 'react';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'
// import { useEagerConnect, useInactiveListener } from '../web3/hooks'
import { injected } from '../web3/connector'
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import {ConnectMetamask} from "../web3/ConnectWeb3"
import { useWeb3Context } from "../contexts/web3";
import useAsync from "../useAsync";

export function ConnectWallet() {

    const { state: { account }, updateAccount } = useWeb3Context()
    const { pending, error, call } = useAsync(ConnectMetamask)
    // @ts-ignore

    async function ConnectMetamask() {
        const { error, data } = await call(null);

        if (error) {
            // console.error(error);
            updateAccount(data);

        }
        if (data) {
            updateAccount(data);
        }

    }
    return (
        <div tw=" flex flex-col py-4 bg-white opacity-100 border-4 rounded-xl border-black" >
            <span tw="border-b-2 border-black text-center" >Connect Wallet</span>
            <div onClick={ConnectMetamask} tw="flex items-center justify-between border-b-2 cursor-pointer bg-white hover:bg-black hover:text-white border-black p-2">
                <span tw="w-52 leading-5 text-center ">Connect Via Metamask</span>
                <img tw="w-12" src="/assets/icons/metamask.svg" alt="" />
            </div>
            <div tw="flex items-center justify-between border-b-2 border-black p-2 cursor-pointer bg-white hover:bg-black hover:text-white">
                <span tw="w-52 leading-5 text-center ">Connect Via Trustwallet</span>
                <img tw="w-12" src="/assets/icons/trustwallet.svg" alt="" />
            </div>
            <div tw="pt-12 pr-2 flex justify-end opacity-30">
                <img tw="w-32" src="/assets/icons/CHADLarge.svg" alt="" />
            </div>
        </div>
    )
}