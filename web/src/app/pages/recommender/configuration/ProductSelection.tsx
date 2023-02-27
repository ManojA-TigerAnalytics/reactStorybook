import { Divider, Typography } from '@mui/material'
import DropDownForm from 'app/components/recommender/DropDownForm'
import { DropDownOption } from '../recommender.types'

type ProductSelectionProps = {
  control: any
  options: DropDownOption[]
}
function ProductSelection({ control, options }: ProductSelectionProps) {
  return (
    <div className='grid grid-cols-2 gap-4 '>
      <Typography className='col-span-2'>Product</Typography>
      <DropDownForm
        control={control}
        label='Product one'
        name='promoDuration'
        options={options}
      />
      <DropDownForm
        control={control}
        label='Product two'
        name='promoDuration'
        options={options}
      />
      <DropDownForm
        control={control}
        label='Product three'
        name='promoDuration'
        options={options}
      />
      <Divider className='col-span-2' />
    </div>
  )
}

export default ProductSelection
