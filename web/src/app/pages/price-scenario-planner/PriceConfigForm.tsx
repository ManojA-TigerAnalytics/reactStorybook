import { Paper, TextField } from '@mui/material'
import { globalConstants } from 'app/constants/constant'
import { useState } from 'react'

function PriceConfigForm() {
  const [priceOptimizerName, setPriceOptimizerName] = useState('')
  const [priceOptimizerDescription, setPriceOptimizerDescription] = useState('')
  return (
    <Paper className='p-5' elevation={globalConstants.defaultPaperElevation}>
      <div className='grid grid-cols-4 gap-4'>
        <TextField
          label='Price Optimizer Name'
          className=''
          color='secondary'
          variant='outlined'
          size='small'
          onChange={(e) => setPriceOptimizerName(e.target.value)}
          value={priceOptimizerName}
        />
        <TextField
          label='Description'
          className=''
          color='secondary'
          variant='outlined'
          size='small'
          onChange={(e) => setPriceOptimizerDescription(e.target.value)}
          value={priceOptimizerDescription}
        />
      </div>
    </Paper>
  )
}

export default PriceConfigForm
