import Web3 from "web3"
import { useState, useEffect, useCallback } from "react"

let web3 = new Web3("https://rpc.ftm.tools")

const useEthBalance = () => { // <- PREFIX THE HOOK NAME WITH WORD "use"

  const [balance, setBalance] = useState(0)

  const fetchBalance = useCallback(async () => {
    console.log("Fetching balance")
    const address = '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'

    const rawBalance = await web3.eth.getBalance(address);
    console.log(rawBalance)
    // Format ETH balance and parse it to JS number
    const value = parseFloat(web3.utils.toWei(rawBalance));
    setBalance(value);
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return balance;
}

export default useEthBalance;