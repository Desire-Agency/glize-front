import { Flex, Heading, Text } from "@pancakeswap/uikit"
import { useTranslation } from '@pancakeswap/localization'
import styled from "styled-components"
import ConnectWalletButton from "components/ConnectWalletButton"
import Trans from 'components/Trans'
import { useAccount } from 'wagmi'

const StyledWrapSection = styled(Flex)`
  border-radius: 20px;
  padding: 20px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.tertiary};
  width: 100%;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.xl} {
    border-radius: 40px;
    padding: 30px;
  }
`

const StyledSectionWallet = styled(Flex)`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(28, 14, 44, 0.01);
  backdrop-filter: blur(9px);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;

  button {
    background: transparent !important;
    border: 2px solid ${({ theme }) => theme.colors.secondary} !important;
    background: ${({ theme }) => theme.colors.tertiary} !important; 

    :hover {
      opacity: 0.7 !important;
    }
  }
`

const StyledItem = styled(Flex)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 10px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 30px;
    padding-top: 10px;
  }
`

export type Props = {
  data: { label: string, values: string[] }[]
} & React.HTMLAttributes<HTMLDivElement>

const MyStatsSection = ({ data }: Props) => {
  const { t } = useTranslation();
  const { address: account } = useAccount()

  return (
    <StyledWrapSection style={{position: "relative"}}>
      <Heading mb={30} scale="xl" style={{ fontWeight: "500", zIndex: 1000 }}>{t('My Stats')}</Heading>
        {!account &&
          <StyledSectionWallet>
            <ConnectWalletButton scale="sm">
              <Trans>Connect Wallet</Trans>
            </ConnectWalletButton>
          </StyledSectionWallet>}
        <Flex flexWrap="wrap" style={{ gap: "40px 20px" }}>
          {data.map((item: { label: string, values: string[] }, i: number) => (
            <Flex flexDirection="column" width="calc(50% - 10px)" key={`${i.toString()}`}>
              <Text color="textGray" mb="5px" fontSize="14px">
                {item.label}
              </Text>
              {item.values.map((str: string, index: number) => (
                <Text color="textSubtle" fontSize="18px" key={`${index.toString()}`}>{account ? str : "0.00"}</Text>
              ))}
            </Flex>
          ))}
        </Flex>
    </StyledWrapSection>
  )
}

export default MyStatsSection