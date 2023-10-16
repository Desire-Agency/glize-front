import { Box } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledPriceChart = styled(Box)<{
  $isDark: boolean
  $isExpanded: boolean
  $isFullWidthContainer?: boolean
}>`
  border: none;
  border-radius: 32px;
  width: 100%;
  padding-top: 36px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 8px;
    background: ${({ theme }) => `${theme.colors.backgroundAlt}`};
    border: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
    border-radius: 40px;
    width: 100%;
    height: 100%;
  }
`

StyledPriceChart.defaultProps = {
  height: '70%',
}
