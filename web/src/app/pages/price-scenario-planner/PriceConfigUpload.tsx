import { Button, Paper, Typography } from '@mui/material'
import { globalConstants } from 'app/constants/constant'
import { useState } from 'react'

function PriceConfigUpload() {
  const [disabled, setDisabled] = useState(true)
  const onDownloadTemplate = () => {
    console.log('making api call to get the template')
    setDisabled(true)
  }
  const onUploadConfig = () => {
    console.log('making api call to upload the config')
    setDisabled(false)
  }
  return (
    <Paper
      className='p-5 mt-5'
      elevation={globalConstants.defaultPaperElevation}
    >
      <Typography className='font-semibold'>
        Upload price recomendation configuration
      </Typography>
      <div className='grid grid-cols-1 gap-4 justify-items-center mt-20'>
        <img
          src='assets\price-config\priceupload.png'
          alt='price upload'
          className='bg-white rounded-full'
        />
        <Typography className='w-1/4 text-center'>
          Please upload the file with required data using following template
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          component='button'
          onClick={onDownloadTemplate}
        >
          DOWNLOAD TEMPLATE
        </Button>
        <Button
          variant='contained'
          color='secondary'
          component='label'
          onClick={onUploadConfig}
        >
          UPLOAD FILE
          <input
            hidden
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            multiple
            id='raised-button-file'
            type='file'
          />
        </Button>
        <Button
          variant='contained'
          color='secondary'
          component='button'
          onClick={onUploadConfig}
          className='mt-5'
          disabled={disabled}
        >
          Submit
        </Button>
      </div>
    </Paper>
  )
}

export default PriceConfigUpload
