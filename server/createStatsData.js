import axios from "axios"

const re = /(\d+) ENABLED/

export async function getBlockCount() {
    const blockCountRes = await axios.get("https://explorer.smartcash.cc/api/getblockcount")
    return blockCountRes.data
}

export async function getCoinMarketCap() {
    const coinMarketcapRes = await axios.get("https://api.coinmarketcap.com/v1/ticker/smartcash")
    return coinMarketcapRes.data[0]
}

export async function getEligibleForSmartRewards() {
    const ccodamRes = await axios.get("http://smartrewards.ccodam.dk/api/HourlyEligibility/24")
    return +ccodamRes.data.SumValue.filter(Boolean).pop()
}

export async function getSmartNodesCount() {
    const bitcoinerRes = await axios.get("https://smartcash.bitcoiner.me/smartnodes/list/")
    return +re.exec(bitcoinerRes.data)[1]
}

export default async function createStatsData() {
    // const blockCount = await getBlockCount()
    const [
        blockCount,
        { price_usd: priceUsd, price_btc: priceBtc },
        eligbleForSmartRewards,
        smartNodesCount
    ] = await Promise.all([getBlockCount(), getCoinMarketCap(), getEligibleForSmartRewards(), getSmartNodesCount()])
    return {
        blockCount,
        price: {
            usd: +priceUsd,
            btc: +priceBtc
        },
        eligbleForSmartRewards,
        smartNodesCount
    }
}
