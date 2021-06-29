import { InjectedConnector } from '@web3-react/injected-connector'

const POLLING_INTERVAL = 12000
const RPC_URLS = {
  250: "https://rpc.ftm.tools/"
}

export const injected = new InjectedConnector({ supportedChainIds: [250] })
