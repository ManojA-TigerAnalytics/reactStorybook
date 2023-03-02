import { Container, Typography } from '@mui/material'
import PriceConfigForm from './PriceConfigForm'
import PriceConfigUpload from './PriceConfigUpload'

function PricePlanner() {
  return (
    <Container maxWidth='xl' className='px-10 py-5'>
      <Typography className='font-semibold mb-5'>
        Price Configuration
      </Typography>
      <PriceConfigForm />
      <PriceConfigUpload />
    </Container>
  )
}

export default PricePlanner
