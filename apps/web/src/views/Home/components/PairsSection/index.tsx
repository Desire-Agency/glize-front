import { useMemo, useState } from "react"
import styled from 'styled-components'
import orderBy from "lodash/orderBy"
import { Flex, Heading } from "@pancakeswap/uikit"
import { useTranslation } from '@pancakeswap/localization'

export interface ITablePairRow {
  imgTokenUrl: string,
  name: string,
  liquidity: number,
  volumeDay: number,
  volumeWeek: number,
  fees: number,
  apy: number
}

const StyledTable = styled("table")`
  border-collapse: separate;
  border-spacing: 0px 10px;
  width: 100%;
  min-width: 800px;
`

const StyledTableWrap = styled("div")`
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;

  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-button {
    background: ${({ theme }) => theme.colors.tertiary};
    outline: none;
    height: 4px
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.tertiary};
    height: 4px
  }
}
`

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

const StyledTh = styled("th")`
  text-align: left;
  padding-bottom: 22px;
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  width: 17%;
  padding: 16px 10px;

  :hover {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  :first-child {
    width: 25%;
    padding-left: 0;
  }

  :last-child {
    width: 15%;
  }

  :first-child:hover {
    cursor: default;
    color: ${({ theme }) => theme.colors.textGray};
  }
`

const StyledTd = styled("td")`
  padding: 16px 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  vertical-align: middle;

  :first-child {
    padding: 16px 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px; 
  }

  :last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`

const StyledRow = styled("tr")`
  background: ${({ theme }) => theme.colors.textDark}; 
  
`

export type Props = { data: ITablePairRow[] } & React.HTMLAttributes<HTMLDivElement>

const PairsSection = ({ data }: Props) => {
  const [sortOption, setSortOption] = useState('liquidity')

  const { t } = useTranslation();

  const dataTable = useMemo(() => (orderBy(data, (str: ITablePairRow) => Number(str[sortOption]), 'desc')), [sortOption, data])

  return (
    <StyledWrapSection>
      <Heading mb={30} scale="xl" style={{ fontWeight: "500" }}>{t('Top pairs')}</Heading>
      <StyledTableWrap>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Name</StyledTh>
              <StyledTh onClick={() => setSortOption("liquidity")}>Liquidity {sortOption === "liquidity" && "↓"}</StyledTh>
              <StyledTh onClick={() => setSortOption("valDay")}>Volume (24hrs) {sortOption === "valDay" && "↓"}</StyledTh>
              <StyledTh onClick={() => setSortOption("valWeek")}>Volume (7d) {sortOption === "valWeek" && "↓"}</StyledTh>
              <StyledTh onClick={() => setSortOption("fees")}>Fees (24hr) {sortOption === "fees" && "↓"}</StyledTh>
              <StyledTh onClick={() => setSortOption("apy")}>APY {sortOption === "apy" && "↓"}</StyledTh>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item: ITablePairRow, i: number) => (
              <StyledRow key={`${i.toString()}`}>
                <StyledTd>
                  <Flex alignItems="center">
                    <img src={item.imgTokenUrl} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: 20 }} />
                    {item.name}
                  </Flex>
                </StyledTd>
                <StyledTd>{item.liquidity}</StyledTd>
                <StyledTd>{item.volumeDay}</StyledTd>
                <StyledTd>{item.volumeWeek}</StyledTd>
                <StyledTd>{item.fees}</StyledTd>
                <StyledTd>{item.apy}</StyledTd>
              </StyledRow>
            ))}
          </tbody>
        </StyledTable>
      </StyledTableWrap>
    </StyledWrapSection>
  )
}

export default PairsSection