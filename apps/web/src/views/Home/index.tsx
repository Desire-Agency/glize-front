import { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useAccount } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainId } from '@pancakeswap/sdk'
import UserBanner from './components/UserBanner'
import VolumeSection from './components/VolumeSection'
import StatsSection from './components/StatsSection'
import MyStatsSection from './components/MyStatsSection'
import PairsSection, { ITablePairRow } from './components/PairsSection'

const StyledHome = styled(Flex)`
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;

  ${({ theme }) => theme.mediaQueries.xl} {
    gap: 40px;
    margin-top: 40px;
  }
`

const StyledTopSec = styled("div")`
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }
`

const UserBannerWrapper = styled(Flex)`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  background: ${({ theme }) => theme.colors.tertiary};
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const { t } = useTranslation();

  const [dataStats, setDataStats] = useState([
    { label: t('Price'), val: "$ 0.079" },
    { label: t('Market Cap'), val: "$ 0" },
    { label: t('DAO Locked'), val: "0.000" },
    { label: t('Trade Mining Reward (Locked) '), val: "0.000" },
    { label: t('DAO Locked'), val: "0.000" },
    { label: t('Circulating'), val: "0.000" },
    { label: t('Current Total Supply'), val: "0.000" },
  ])

  const [dataMyStats, setDataMyStats] = useState([
    { label: t('My Farm Rewards'), values: ["0.000", "0.000"] },
    { label: t('My NFT Bonus'), values: ["0.000", "0.000"] },
    { label: t('My Spacebase Rewards'), values: ["0.000", "0.000"] },
    { label: t('My Total Rewards'), values: ["0.000", "0.000"] },
  ])

  const [dataPairs, setDataPairs] = useState<ITablePairRow[]>([
    { imgTokenUrl: "https://tokens.pancakeswap.finance/images/0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1.png", name: "ETH-USDT", liquidity: 234, volumeDay: 125, volumeWeek: 536, fees: 123, apy: 6434 },
    { imgTokenUrl: "https://tokens.pancakeswap.finance/images/0x16faF9DAa401AA42506AF503Aa3d80B871c467A3.png", name: "BTC-USDT", liquidity: 423, volumeDay: 5436, volumeWeek: 435, fees: 677, apy: 5435 },
    { imgTokenUrl: "https://tokens.pancakeswap.finance/images/0x374Ca32fd7934c5d43240E1e73fa9B2283468609.png", name: "TEX-USDT", liquidity: 23, volumeDay: 236, volumeWeek: 366, fees: 647, apy: 5345 },
    { imgTokenUrl: "https://tokens.pancakeswap.finance/images/0x91d6d6aF7635B7b23A8CED9508117965180e2362.png", name: "KRR-USDT", liquidity: 124, volumeDay: 657, volumeWeek: 345, fees: 678, apy: 733 },
    { imgTokenUrl: "https://tokens.pancakeswap.finance/images/0x724A32dFFF9769A0a0e1F0515c0012d1fB14c3bd.png", name: "WRE-USDT", liquidity: 324, volumeDay: 345, volumeWeek: 657, fees: 456, apy: 37 }
  ])

  return (
    <>
      {account && chainId === ChainId.BSC && (
        <UserBannerWrapper>
          <UserBanner />
        </UserBannerWrapper>
      )}
      <StyledHome>
        <StyledTopSec>
          <VolumeSection />
          <StatsSection data={dataStats} />
          <MyStatsSection data={dataMyStats} />
        </StyledTopSec>
        <PairsSection data={dataPairs} />
      </StyledHome>
    </>
  )
}

export default Home