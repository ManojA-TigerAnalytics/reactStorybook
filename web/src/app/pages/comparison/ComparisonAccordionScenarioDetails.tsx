import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { comparisonAccordionDetailsMock } from './comparisonMock'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
]

function ComparisonAccordionScenarioDetails() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='grid grid-cols-5 gap-2 text-center'>
        <Typography className='col-span-2'>Scenario ID</Typography>
        <Typography className='col-span-1'>:</Typography>
        <Typography className='col-span-2'>1683</Typography>
      </div>
      <div className='col-span-3'>
        <Box sx={{ height: 200, width: '97%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
    </div>
  )
}

export default ComparisonAccordionScenarioDetails
