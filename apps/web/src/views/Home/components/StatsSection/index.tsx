import { Flex, Heading, Text } from "@pancakeswap/uikit"
import { useTranslation } from '@pancakeswap/localization'
import styled from "styled-components"

const StyledWrapSection = styled(Flex)`
  flex-direction: column;
  background: ${({ theme }) => theme.colors.tertiary};
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  
  ${({ theme }) => theme.mediaQueries.xl} { 
    border-radius: 40px;
    padding: 30px;
  }
`

export type Props = { data: { label: string, val: string }[] } & React.HTMLAttributes<HTMLDivElement>

const StatsSection = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledWrapSection>
      <Heading mb={30} scale="xl" style={{ fontWeight: "500" }}>{t('Stats')}</Heading>
      <Flex flexWrap="wrap" style={{ gap: "40px 20px" }}>
        {data.map((item: { label: string, val: string }, i: number) => (
          <Flex flexDirection="column" width="calc(50% - 10px)" key={`${i.toString()}`}>
            <Text color="textGray" mb="5px" fontSize="14px">
              {item.label}
            </Text>
            <Text color="textSubtle" fontSize="18px">
              {item.val}
            </Text>
          </Flex>
        ))}
      </Flex>
    </StyledWrapSection>
  )
}

export default StatsSection