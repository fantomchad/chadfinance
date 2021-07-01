import Web3 from "web3"
import { useState, useEffect, useCallback } from "react"
import { AbiItem } from 'web3-utils'

let web3 = new Web3("https://rpc.ftm.tools")

/*
    Paintswap Router
*/

const paintRouterAddress = '0xfD000ddCEa75a2E23059881c3589F6425bFf1AbB'

// const paintRouterContract = new web3.eth.Contract( paintRouterABI as AbiItem[],paintRouterAddress );

/*

Checkout https://thegraph.com/docs/graphql-api#queries 
https://thegraph.com/explorer/subgraph/paint-swap-finance/exchange


*/