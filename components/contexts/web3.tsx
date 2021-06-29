// @ts-nocheck
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import { ethers, providers } from "ethers";
import { ConnectMetamask, SubscribeToAccount, subscribeToNetId } from '../web3/ConnectWeb3'
import internal from "stream";

interface State {
    account;
    web3;
    netId;
}

const INITIAL_STATE: State = {
    account: "Connect",
    web3: null,
    netId: 0,
}

const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

interface UpdateAccount {
    type: "UPDATE_ACCOUNT";
    account: string;
    web3?;
}

type Action = UpdateAccount | UpdateNetId;

interface UpdateNetId {
    type: "UPDATE_NET_ID";
    netId: number;
}
const UPDATE_NET_ID = "UPDATE_NET_ID";

function reducer(state: State = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case UPDATE_ACCOUNT: {
            const web3 = action.web3 || state.web3;
            const { account } = action;

            return {
                ...state,
                web3,
                account,
            };
        }
        case UPDATE_NET_ID: {
            const { netId } = action;

            return {
                ...state,
                netId,
            };
        }
        default:
            return state;
    }
}
// @ts-nocheck
const Web3Context = createContext({
    state: INITIAL_STATE,
    updateAccount: (_data: { account: string; web3? }) => {
        let provider = null
        if (window.ethereum) {
        ethereum.enable()
        provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log('llosdsds')

    } else {
        alert("Metamask not detected")
    }
    return { provider, account:0 || "" };
    },
    updateNetId: (_data: { netId: number }) => {},
  });

export function useWeb3Context() {
    return useContext(Web3Context);
}


interface ProviderProps { }

export const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    function updateAccount(data: { account: string; web3?}) {
        dispatch({
            type: UPDATE_ACCOUNT,
            ...data,
        });
    }

    function updateNetId(data: { netId: number }) {
        dispatch({
            type: UPDATE_NET_ID,
            ...data,
        });
    }

    return (
        <Web3Context.Provider
            value={useMemo(
                () => ({
                    state,
                    updateAccount,
                    updateNetId,
                }),
                [state]
            )}
        >
            {children}
        </Web3Context.Provider>
    );
};


export function Updater() {
    const { state, updateNetId } = useWeb3Context();

    useEffect(() => {
        if (state.web3) {
            const unsubscribe = SubscribeToAccount(state.web3, (error, account) => {
                if (error) {
                    console.error(error);
                }
                if (account !== undefined && account !== state.account) {
                    window.location.reload();
                }
            });

            return unsubscribe;
        }
    }, [state.web3, state.account]);

    useEffect(() => {
        if (state.web3) {
            const unsubscribe = subscribeToNetId(state.web3, (error, netId) => {
                if (error) {
                    console.error(error);
                }
                if (netId) {
                    if (state.netId === 0) {
                        updateNetId({ netId });
                    } else if (netId !== state.netId) {
                        window.location.reload();
                    }
                }
            });

            return unsubscribe;
        }
    }, [state.web3, state.netId, updateNetId]);

    return null;
}