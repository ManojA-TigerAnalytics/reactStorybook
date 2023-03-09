/* eslint-disable camelcase */
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'

type ComparisonTableProps = {
  rows: any[]
  columns: string[]
  label: string
  nonGrouped: string[]
}
function ComparisonTable({
  rows,
  columns,
  label,
  nonGrouped,
}: ComparisonTableProps) {
  return (
    <TableContainer component={Paper}>
      <Box className='p-4'>
        <Typography className='p-4'>{label}</Typography>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map((key: string) => (
                <TableCell
                  sx={{ fontWeight: 'bold' }}
                  align='center'
                  colSpan={nonGrouped.includes(key) ? 1 : 2}
                  key={`${key}-label`}
                >
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={row.sno}>
                {nonGrouped.map((key: string) => (
                  <TableCell key={`${key}-${label}`} align='center'>
                    {row[key as string]}
                  </TableCell>
                ))}
                {Object.keys(row).map((key: string) =>
                  !nonGrouped.includes(key) ? (
                    <Fragment key={`${key}-${row.sno}`}>
                      <TableCell align='right'>
                        {row[key as string].lift
                          ? `${row[key as string].lift} %`
                          : '-'}
                      </TableCell>
                      <TableCell align='left'>
                        {row[key as string].scenario_value ?? '-'}
                      </TableCell>
                    </Fragment>
                  ) : (
                    ''
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  )
}

export default ComparisonTable
