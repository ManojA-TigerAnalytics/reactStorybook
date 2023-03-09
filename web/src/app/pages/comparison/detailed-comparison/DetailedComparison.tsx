import { Container } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TocIcon from '@mui/icons-material/Toc'
import ComparisonGraph from './ComparisonGraph'
import SwitchTabButton from '../../../components/common/SwitchTabButton'
import ScenarioComparison from './ScenarioComparison'

function DetailedComparison() {
  const switchedTabItems = [
    {
      label: 'graph',
      component: <ComparisonGraph />,
      icon: <TrendingUpIcon />,
    },
    {
      label: 'table',
      component: <ScenarioComparison />,
      icon: <TocIcon />,
    },
  ]
  return (
    <Container maxWidth='xl' className='px-10'>
      <SwitchTabButton items={switchedTabItems} className='flex justify-end' />
    </Container>
  )
}

export default DetailedComparison
