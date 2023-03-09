import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  {
    field: 'instore',
    headerName: 'Instore',
    flex: 1,
  },
]

const rows = [
  { name: 'Company', instore: 'Company1' },
  { name: 'Stores in Scope', instore: '800' },
  { name: 'Items in Scope', instore: '300' },
  { name: 'Store x items in potential price range', instore: '50' },
]

function ConfigPreviewModal({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogContent>
          <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.name}
              disableSelectionOnClick
              disableColumnFilter
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default ConfigPreviewModal
