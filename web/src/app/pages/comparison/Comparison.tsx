import { Container } from '@mui/material'
import ComparisonFilter from './ComparisonFilter'
import ComparisonAcordion from './ComparisonAcordion'

function Comparison() {
  return (
    <Container maxWidth='xl' className='px-10 py-5'>
      <ComparisonFilter />
      <div className='mt-5'>
        <ComparisonAcordion />
      </div>
    </Container>
  )
}

export default Comparison
