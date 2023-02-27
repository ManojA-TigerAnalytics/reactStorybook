import { Divider, Typography } from '@mui/material'
import DropDownForm from 'app/components/recommender/DropDownForm'
import { DropDownOption } from '../recommender.types'

type ObjectiveSelectionProps = {
  control: any
  options: DropDownOption[]
}
function ObjectiveSelection({ control, options }: ObjectiveSelectionProps) {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <Typography>Objective</Typography>
      <DropDownForm
        control={control}
        label='Apply To'
        name='promoDuration'
        options={options}
        className='col-span-1 col-start-4'
      />
      <DropDownForm
        control={control}
        label='Maximize'
        name='promoDuration'
        options={options}
        className='col-start-1'
      />
      <DropDownForm
        control={control}
        label='Lower Bound'
        name='promoDuration'
        options={options}
        className='col-span-1 col-start-3'
      />
      <Divider className='col-span-4' />
    </div>
  )
}

export default ObjectiveSelection
