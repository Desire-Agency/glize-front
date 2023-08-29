import { Flex, Heading, Text } from "@pancakeswap/uikit"
import { useTranslation } from '@pancakeswap/localization'
import styled from "styled-components"

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

export type Props = {
  data: { label: string, values: string[] }[]
} & React.HTMLAttributes<HTMLDivElement>

const MyStatsSection = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledWrapSection>
      <Heading mb={30} scale="xl" style={{ fontWeight: "500" }}>{t('My Stats')}</Heading>
      <Flex flexWrap="wrap" style={{ gap: "40px 20px" }}>
        {data.map((item: { label: string, values: string[] }, i: number) => (
          <Flex flexDirection="column" width="calc(50% - 10px)" key={`${i.toString()}`}>
            <Text color="textGray" mb="5px" fontSize="14px">
              {item.label}
            </Text>
            {item.values.map((str: string, index: number) => (
              <Text color="textSubtle" fontSize="18px" key={`${index.toString()}`}>{str}</Text>
            ))}
          </Flex>
        ))}
      </Flex>
    </StyledWrapSection>
  )
}

export default MyStatsSection
