import { Paper, Typography } from '@mui/material'
import { globalConstants } from 'app/constants/constant'
import ReactECharts, {
  ReactEChartsProps,
} from '../../../components/common/React-ECharts'
import {
  overviewGraphData,
  productCategoryGraphData,
  segmentGraphData,
} from './graphMock'

function ComparisonGraph() {
  const overViewData: ReactEChartsProps['option'] = overviewGraphData
  const segmentData: ReactEChartsProps['option'] = segmentGraphData
  const productData: ReactEChartsProps['option'] = productCategoryGraphData

  return (
    <div className='grid grid-cols-1 gap-4'>
      <Paper className='p-5' elevation={globalConstants.defaultPaperElevation}>
        <Typography>Overview</Typography>
        <ReactECharts option={overViewData} />
      </Paper>
      <Paper className='p-5' elevation={globalConstants.defaultPaperElevation}>
        <Typography>Segment</Typography>
        <ReactECharts option={segmentData} />
      </Paper>
      <Paper className='p-5' elevation={globalConstants.defaultPaperElevation}>
        <Typography>Product</Typography>
        <ReactECharts option={productData} />
      </Paper>
    </div>
  )
}

export default ComparisonGraph
