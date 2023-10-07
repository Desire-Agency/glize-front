import { Contract } from '@ethersproject/contracts'
import { ChainId, CurrencyAmount, Pair } from '@pancakeswap/sdk'
import { BUSD, CAKE } from '@pancakeswap/tokens'
import { bscProvider, bscTestnetProvider } from './provider'
import erc20ABI from 'config/abi/erc20.json'
import BigNumber from 'bignumber.js'

const pairAbi = [
  {
    inputs: [],
    name: 'getReserves',
    outputs: [
      {
        internalType: 'uint112',
        name: 'reserve0',
        type: 'uint112',
      },
      {
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112',
      },
      {
        internalType: 'uint32',
        name: 'blockTimestampLast',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const cakeBusdPairMap = {
  [ChainId.BSC]: {
    address: Pair.getAddress(CAKE[ChainId.BSC], BUSD[ChainId.BSC]),
    tokenA: CAKE[ChainId.BSC],
    tokenB: BUSD[ChainId.BSC],
  },
  [ChainId.BSC_TESTNET]: {
    address: Pair.getAddress(CAKE[ChainId.BSC_TESTNET], BUSD[ChainId.BSC_TESTNET]),
    tokenA: CAKE[ChainId.BSC_TESTNET],
    tokenB: BUSD[ChainId.BSC_TESTNET],
  },
}

const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  const BIG_TEN = new BigNumber(10)
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const getCakePrice = async (isTestnet: boolean) => {
  const pairConfig = cakeBusdPairMap[isTestnet ? ChainId.BSC_TESTNET : ChainId.BSC]
  const pairContract = new Contract(pairConfig.address, pairAbi, isTestnet ? bscTestnetProvider : bscProvider)
  const reserves = await pairContract.getReserves()
  const { reserve0, reserve1 } = reserves
  const { tokenA, tokenB } = pairConfig

  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

  const pair = new Pair(
    CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
    CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
  )

  return pair.priceOf(tokenA)
}

const getCakeSupply = async (isTestnet: boolean) => {
  const token = isTestnet ? CAKE[ChainId.BSC_TESTNET] : CAKE[ChainId.BSC]
  const tokenContract = new Contract(token.address, erc20ABI, isTestnet ? bscTestnetProvider : bscProvider)
  const supply = await tokenContract.totalSupply()
  return new BigNumber(supply.toString())
}

export const getCakeSupplyFormatted = async (isTestnet: boolean) => {
  const token = isTestnet ? CAKE[ChainId.BSC_TESTNET] : CAKE[ChainId.BSC]
  const supply = await getCakeSupply(isTestnet)
  return getBalanceAmount(supply, token.decimals).toFixed(0)
}

const getCirculatedSupply = async (isTestnet: boolean) => {
  const supply = await getCakeSupply(isTestnet)
  const burned = new BigNumber('0')
  return supply.minus(burned)
}

export const getCirculatedSupplyFormatted = async (isTestnet: boolean) => {
  const token = isTestnet ? CAKE[ChainId.BSC_TESTNET] : CAKE[ChainId.BSC]
  const supply = await getCirculatedSupply(isTestnet)
  return getBalanceAmount(supply, token.decimals).toFixed(0)
}

export const getMarketCap = async (isTestnet: boolean) => {
  const token = isTestnet ? CAKE[ChainId.BSC_TESTNET] : CAKE[ChainId.BSC]
  const rawPrice = await getCakePrice(isTestnet)
  const price = new BigNumber(rawPrice.toSignificant(6))
  const rawSupply = await getCirculatedSupply(isTestnet)
  const supply = getBalanceAmount(rawSupply, token.decimals)
  return price.times(supply).toFixed(0)
}