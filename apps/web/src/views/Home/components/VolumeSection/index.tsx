import dynamic from 'next/dynamic'
import { Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'

const StyledWrapSection = styled(Flex)`
  border-radius: 20px;
  padding: 20px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.tertiary};
  width: 100%;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 30px;
    border-radius: 40px;
  }
`

const VolumeChart = dynamic(() => import('./VolumeChart'), { ssr: false })

const VolumeSection = () => {
  const { t } = useTranslation()

  return (
    <StyledWrapSection>
      <Text mb={10} style={{ fontWeight: "600", fontSize: 16 }}>{t('Volume (24hr)')}</Text>
      <Flex alignItems="center" style={{ gap: 10 }} mb={10}>
        <Text style={{ fontWeight: "500", fontSize: 34 }}>8 200 000 $</Text>
        <Text style={{ fontWeight: "700", fontSize: 14 }}>-18.32%</Text>
      </Flex>
      <VolumeChart data={[
        { time: '2018-01-22', value: 18000000 },
        { time: '2018-02-23', value: 17000000 },
        { time: '2018-03-24', value: 16400000 },
        { time: '2018-04-25', value: 16000000 },
        { time: '2018-05-26', value: 14000000 },
        { time: '2018-06-27', value: 12000000 },
        { time: '2018-07-28', value: 10000000 },
        { time: '2018-08-29', value: 6800000 },
        { time: '2018-09-30', value: 6000000 },
        { time: '2018-10-31', value: 4000000 },
      ]} />
    </StyledWrapSection>
  )
}

export default VolumeSection
