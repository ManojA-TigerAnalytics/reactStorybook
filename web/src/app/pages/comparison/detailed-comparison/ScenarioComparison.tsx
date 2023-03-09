import ComparisonTable from 'app/components/comparison/ComparisonTable'
import { Box } from '@mui/material'
import {
  OverViewColumns,
  OverViewRows,
  ProductColumns,
  ProductRows,
  SegmentColumns,
  SegmentRows,
} from './tableMock'

function ScenarioComparison() {
  return (
    <Box className='grid grid-cols-1 gap-4'>
      <ComparisonTable
        rows={OverViewRows}
        columns={OverViewColumns}
        nonGrouped={['sno', 'kpi']}
        label='Overview'
      />
      <ComparisonTable
        rows={SegmentRows}
        columns={SegmentColumns}
        nonGrouped={['sno', 'segment']}
        label='By Segment'
      />
      <ComparisonTable
        rows={ProductRows}
        columns={ProductColumns}
        nonGrouped={['sno', 'product']}
        label='By Product Category'
      />
    </Box>
  )
}

export default ScenarioComparison
