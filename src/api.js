export const currentBlockHeight = () => fetch("https://explorer.smartcash.cc/api/getblockcount").then(res => res.text())

export const coinMarketcap = () => fetch("https://api.coinmarketcap.com/v1/ticker/smartcash").then(res => res.json())

export const eligibleSmartRewards = () =>
    fetch("http://smartrewards.ccodam.dk/api/HourlyEligibility/24").then(res => res.json())

export const numMasterNodes = () => fetch("https://smartcash.bitcoiner.me/smartnodes/list/")
