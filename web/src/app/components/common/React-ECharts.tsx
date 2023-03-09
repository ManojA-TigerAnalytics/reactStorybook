import { useRef, useEffect, CSSProperties } from 'react'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import { init, getInstanceByDom, use } from 'echarts/core'
import { ScatterChart, LineChart, BarChart } from 'echarts/charts'
import {
  LegendComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  DataZoomComponent,
} from 'echarts/components'
import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core'
import type {
  BarSeriesOption,
  LineSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts'
import type {
  TitleComponentOption,
  GridComponentOption,
} from 'echarts/components'
import { useAppSelector } from 'app/hooks/store-hooks'

// Register the required components
use([
  LegendComponent,
  ScatterChart,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent, // A group of utility tools, which includes export, data view, dynamic type switching, data area zooming, and reset.
  DataZoomComponent, // Used in Line Graph Charts
  CanvasRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
  SVGRenderer,
])

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | ScatterSeriesOption
>

export interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  // theme?: 'light' | 'dark'
}

function ReactECharts({
  option,
  style,
  settings,
  loading,
}: // theme,
ReactEChartsProps) {
  const currentTheme = useAppSelector((state) => state.theme.mode)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current, currentTheme)
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize()
    }
    window.addEventListener('resize', resizeChart)

    // Return cleanup function
    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [currentTheme])

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart?.setOption(
        {
          ...option,
          grid: {
            right: '14%',
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          // series: {
          //   type: 'bar',
          //   // barWidth: 8,
          //   // itemStyle: {
          //   //   borderWidth: 0,
          //   // },
          //   // barCategoryGap: 0.05,
          // },
          seriesMixins: {
            barMixin: {
              label: {
                show: true,
                position: 'inside',
              },
            },
          },
        },
        settings
      )
    }
  }, [option, settings, currentTheme]) // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if (loading === true) {
        chart?.showLoading()
      } else {
        chart?.hideLoading()
      }
    }
  }, [loading, currentTheme])

  return (
    <div
      ref={chartRef}
      // className='p-10'
      style={{ width: '100%', height: '400px', ...style }}
    />
  )
}

ReactECharts.defaultProps = {
  style: '',
  settings: '',
  loading: false,
  // theme: '',
}

export default ReactECharts
