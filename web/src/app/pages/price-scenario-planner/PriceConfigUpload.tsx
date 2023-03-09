/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Button,
  Chip,
  ChipProps,
  Link,
  Paper,
  Typography,
} from '@mui/material'
import { globalConstants } from 'app/constants/constant'
import { useState } from 'react'
import useNotification from 'app/hooks/useNotification'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
// import ConfigPreviewModal from './ConfigPreviewModal'

function getChipProps(params: GridRenderCellParams): ChipProps {
  if (params.value === 'passed') {
    return {
      label: params.value,
      color: 'success',
    }
  }

  if (params.value === 'failed') {
    return {
      label: params.value,
      color: 'error',
    }
  }
  return {
    label: params.value,
  }
}
const columns: GridColDef[] = [
  // { field: 'name', headerName: 'Name', flex: 1 },
  // {
  //   field: 'instore',
  //   headerName: 'Instore',
  //   flex: 1,
  // },
  {
    field: 'rule',
    headerName: 'Rule',
    flex: 1,
  },
  {
    field: 'ruleDescription',
    headerName: 'Rule Description',
    flex: 1,
  },
  {
    field: 'row',
    headerName: 'Row',
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => <Chip size='small' {...getChipProps(params)} />,
  },
]

// const rows = [
//   { name: 'Company', instore: 'Company1' },
//   { name: 'Stores in Scope', instore: '800' },
//   { name: 'Items in Scope', instore: '300' },
//   { name: 'Store x items in potential price range', instore: '50' },
// ]
const rows = [
  {
    rule: 'rule1',
    ruleDescription: 'rule1 description',
    row: 12,
    status: 'passed',
  },
  {
    rule: 'rule2',
    ruleDescription: 'rule2 description',
    row: 122,
    status: 'failed',
  },
  {
    rule: 'rule23',
    ruleDescription: 'rule23 description',
    row: 142,
    status: 'passed',
  },
  {
    rule: 'rule4',
    ruleDescription: 'rule4 description',
    row: 164,
    status: 'passed',
  },
  {
    rule: 'rule5',
    ruleDescription: 'rule5 description',
    row: 221,
    status: 'failed',
  },
]
const downloadPriceFeed = (response: any, name: any) => {
  const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
  const downloadURL = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = downloadURL
  const filename: any = name
  link.download = `${filename}.xlsx`
  link.click()
}

function PriceConfigUpload() {
  const [disabled, setDisabled] = useState(true)
  const [open, setOpen] = useState(false)
  const { sendNotification } = useNotification()

  const onDownloadTemplate = () => {
    // eslint-disable-next-line no-console
    console.log('making api call to get the template')
    setDisabled(true)
    downloadPriceFeed('test', 'test')
  }
  const onUploadConfig = () => {
    // eslint-disable-next-line no-console
    console.log('making api call to upload the config')
    setDisabled(false)

    setOpen(false)
  }

  const onSubmit = () => {
    setOpen(true)
    sendNotification({ message: 'Uploaded Successfully', variant: 'success' })
    // sendNotification({
    //   message: 'Validations are Partially Failed you can still override rules',
    //   variant: 'warning',
    // })
    // sendNotification({
    //   message: 'Validations are Failed  unable to proceed further',
    //   variant: 'error',
    // })
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
        {!open && (
          <>
            <img
              src='assets\price-config\priceupload.png'
              alt='price upload'
              className='bg-white rounded-full'
            />
            <Typography className='w-1/4 text-center'>
              Please upload the file with required data using following template
            </Typography>
            <Link
              component='button'
              variant='body2'
              color='secondary'
              onClick={onDownloadTemplate}
            >
              DOWNLOAD TEMPLATE
            </Link>
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
          </>
        )}
        {/* <ConfigPreviewModal handleClose={handleClose} open={open} /> */}
        {open && (
          <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.rule}
              disableSelectionOnClick
              disableColumnFilter
            />
          </Box>
        )}
        <Button
          variant='contained'
          color='secondary'
          component='button'
          onClick={onSubmit}
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
