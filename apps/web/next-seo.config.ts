import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Gliese',
  defaultTitle: 'Gliese',
  description:
    'Cheaper and faster than Uniswap? Discover Gliese, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@Gliese',
    site: '@Gliese',
  },
  openGraph: {
    title: '🥞 Gliese - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description:
      'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Gliese), NFTs, and more, on a platform you can trust.',
  },
}
