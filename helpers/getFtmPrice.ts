const getFtmPrice = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd')
  const data = await response.json()
  
  return data.fantom.usd
}

export default getFtmPrice