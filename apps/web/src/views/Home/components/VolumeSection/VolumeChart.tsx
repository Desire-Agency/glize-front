import { useRef, useState, useEffect } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { LineChartLoader } from 'components/ChartLoaders'
import { darkColors } from '@pancakeswap/ui/tokens/colors'

export type SwapLineChartNewProps = { data: any[] } & React.HTMLAttributes<HTMLDivElement>

const VolumeChart = ({ data, ...rest }: SwapLineChartNewProps) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartCreated, setChartCreated] = useState<IChartApi | undefined>()

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      handleScale: false,
      handleScroll: false,
      height: 300,
      layout: { background: { color: 'transparent' }, textColor: darkColors.text },
      grid: { horzLines: { visible: false }, vertLines: { visible: false } },
      crosshair: { horzLine: { visible: false, labelVisible: false }, mode: 1 },
    })

    const newSeries = chart.addHistogramSeries({ color: darkColors.primaryDark })

    setChartCreated(chart)
    newSeries.setData(data)

    return () => { chart.remove() }
  }, [data])


  return (
    <>
      {!chartCreated && <LineChartLoader />}
      <div ref={chartRef} id="swap-line-chart" {...rest} />
    </>
  )
}

export default VolumeChart
